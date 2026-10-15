import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('agro_kenya_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Orders state - Live accurate customer orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('agro_kenya_orders');
    if (saved && (saved.includes('ord-1001') || saved.includes('Anna F1') || saved.includes('Mwangi'))) {
      localStorage.removeItem('agro_kenya_orders');
      return [];
    }
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('agro_kenya_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('agro_kenya_orders', JSON.stringify(orders));
  }, [orders]);

  // Fetch orders from Supabase if configured
  useEffect(() => {
    async function loadDbOrders() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const formatted = data.map(o => ({
            id: o.id,
            orderNumber: o.order_number,
            buyerId: o.buyer_id,
            buyerName: o.buyer_name || 'Customer',
            buyerPhone: o.buyer_phone,
            sellerId: o.seller_id,
            sellerName: 'Seller',
            status: o.status,
            subtotal: Number(o.subtotal),
            deliveryFee: Number(o.delivery_fee),
            totalAmount: Number(o.total_amount),
            deliveryLocation: o.delivery_location,
            paymentStatus: o.payment_status,
            paymentMode: o.payment_mode || 'Payment on Delivery',
            paymentReference: o.payment_reference || '',
            createdAt: o.created_at,
            items: (o.order_items || []).map(i => ({
              id: i.id,
              productId: i.product_id,
              productName: i.product_name_snapshot,
              quantity: Number(i.quantity),
              unitPrice: Number(i.unit_price),
              lineTotal: Number(i.line_total)
            }))
          }));
          setOrders(formatted);
        }
      } catch (err) {
        console.warn('Failed to load orders from Supabase:', err);
      }
    }
    loadDbOrders();
  }, []);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1;
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, {
        id: product.id,
        title: product.title || product.name,
        price: Number(product.price) || 0,
        priceUnit: product.priceUnit || product.unit || 'unit',
        image: (product.images && product.images[0]) || product.image_url || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
        sellerId: product.userId || product.seller_id,
        sellerName: product.sellerName || product.seller_name || 'Seller',
        quantity: qty
      }];
    });
    addToast(`Added ${product.title || product.name} to cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, quantity) => {
    const qty = Math.max(1, Number(quantity) || 1);
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Compute Cart Totals
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 350 : 0;
  const cartTotal = cartSubtotal + deliveryFee;
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Submit Order
  const submitOrder = async (deliveryDetails) => {
    if (cartItems.length === 0) {
      addToast('Your cart is empty!', 'error');
      return false;
    }

    const orderNumber = `AGRO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      buyerId: currentUser?.id || 'guest',
      buyerName: deliveryDetails.fullName || currentUser?.fullName || 'Customer',
      buyerPhone: deliveryDetails.phone || currentUser?.phone || '+254700000000',
      sellerId: cartItems[0]?.sellerId || 'seller-1',
      sellerName: cartItems[0]?.sellerName || 'Agro Seller',
      status: 'pending',
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      totalAmount: cartTotal,
      deliveryLocation: `${deliveryDetails.address}, ${deliveryDetails.county}`,
      paymentStatus: deliveryDetails.paymentMode === 'M-Pesa' ? 'paid' : 'unpaid',
      paymentMode: deliveryDetails.paymentMode || 'Payment on Delivery',
      paymentReference: deliveryDetails.mpesaRef || '',
      createdAt: new Date().toISOString(),
      items: cartItems.map(item => ({
        id: `item-${Date.now()}-${Math.random()}`,
        productId: item.id,
        productName: item.title,
        quantity: item.quantity,
        unitPrice: item.price,
        lineTotal: item.price * item.quantity
      }))
    };

    // Save locally
    setOrders(prev => [newOrder, ...prev]);

    // Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: dbOrder, error: orderErr } = await supabase
          .from('orders')
          .insert([{
            order_number: orderNumber,
            buyer_id: currentUser?.id,
            seller_id: cartItems[0]?.sellerId,
            status: 'pending',
            subtotal: cartSubtotal,
            delivery_fee: deliveryFee,
            total_amount: cartTotal,
            delivery_location: `${deliveryDetails.address}, ${deliveryDetails.county}`,
            buyer_phone: deliveryDetails.phone || currentUser?.phone,
            buyer_name: deliveryDetails.fullName || currentUser?.fullName,
            payment_status: deliveryDetails.paymentMode === 'M-Pesa' ? 'paid' : 'unpaid',
            payment_mode: deliveryDetails.paymentMode,
            payment_reference: deliveryDetails.mpesaRef || ''
          }])
          .select()
          .single();

        if (!orderErr && dbOrder) {
          const itemsToInsert = cartItems.map(item => ({
            order_id: dbOrder.id,
            product_id: item.id.includes('-') ? null : item.id,
            product_name_snapshot: item.title,
            quantity: item.quantity,
            unit_price: item.price,
            line_total: item.price * item.quantity
          }));
          await supabase.from('order_items').insert(itemsToInsert);
        }
      } catch (err) {
        console.warn('Order sync to Supabase failed:', err);
      }
    }

    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    addToast(`Order ${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  // Order status updates by Seller or Manager
  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addToast(`Order status updated to ${newStatus}`, 'info');

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      } catch (err) {
        console.warn('Update order status in Supabase error:', err);
      }
    }
  };

  const updateOrderPaymentStatus = async (orderId, newPaymentStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o));
    addToast(`Order payment status updated to ${newPaymentStatus}`, 'success');

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({ payment_status: newPaymentStatus }).eq('id', orderId);
      } catch (err) {
        console.warn('Update order payment status error:', err);
      }
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      cartSubtotal,
      deliveryFee,
      cartTotal,
      cartItemCount,
      orders,
      submitOrder,
      updateOrderStatus,
      updateOrderPaymentStatus
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
