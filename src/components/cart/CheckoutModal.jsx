import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, Phone, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { KENYA_COUNTIES } from '../../data/kenyaCounties';

export default function CheckoutModal({ onOrderSuccess }) {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, cartSubtotal, deliveryFee, cartTotal, submitOrder } = useCart();
  const { currentUser } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+254 700 000 000');
  const [county, setCounty] = useState(currentUser?.county || 'Nairobi');
  const [address, setAddress] = useState(currentUser?.town || 'CBD, Nairobi');
  const [paymentMode, setPaymentMode] = useState('Payment on Delivery');
  const [mpesaRef, setMpesaRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const order = await submitOrder({
        fullName,
        phone,
        county,
        address,
        paymentMode,
        mpesaRef
      });
      setIsSubmitting(false);
      if (order && onOrderSuccess) {
        onOrderSuccess(order);
      }
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-scale-up">
        
        {/* HEADER */}
        <div className="p-6 bg-[#064E3B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#087A4B] flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Checkout & Order Confirmation</h2>
              <p className="text-xs text-emerald-200">Complete delivery details for Kenyan transport delivery</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* ORDER SUMMARY */}
          <div className="p-4 bg-[#F8FAF4] rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-xs text-slate-800 block">Order Summary ({cartItems.length} items)</span>
            <div className="max-h-32 overflow-y-auto space-y-1 divide-y divide-slate-100 text-xs">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-1 flex justify-between text-slate-600">
                  <span className="truncate max-w-[240px]">{item.title} (x{item.quantity})</span>
                  <span className="font-bold text-slate-800">KSh {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Subtotal + Transport:</span>
              <span className="font-black text-[#087A4B] text-sm">KSh {cartTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* DELIVERY INFORMATION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#087A4B]" />
              <span>Delivery Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (M-Pesa / Call)</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                  placeholder="+254 712 345 678"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">County</label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                >
                  {KENYA_COUNTIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Specific Location / Town / Market</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#087A4B]"
                  placeholder="e.g. Naivasha Town Main Market / CBD"
                />
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#087A4B]" />
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 transition ${
                paymentMode === 'Payment on Delivery' ? 'border-[#087A4B] bg-[#E8F6EE]' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMode === 'Payment on Delivery'}
                  onChange={() => setPaymentMode('Payment on Delivery')}
                  className="text-[#087A4B]"
                />
                <div>
                  <span className="font-bold text-xs text-slate-800 block">Payment on Delivery</span>
                  <span className="text-[10px] text-slate-500">Pay cash/M-Pesa upon receiving produce</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 transition ${
                paymentMode === 'M-Pesa' ? 'border-[#087A4B] bg-[#E8F6EE]' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMode === 'M-Pesa'}
                  onChange={() => setPaymentMode('M-Pesa')}
                  className="text-[#087A4B]"
                />
                <div>
                  <span className="font-bold text-xs text-slate-800 block">M-Pesa Express</span>
                  <span className="text-[10px] text-slate-500">Enter transaction reference code</span>
                </div>
              </label>
            </div>

            {paymentMode === 'M-Pesa' && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
                <p className="text-emerald-900 font-bold">M-Pesa Payment Instructions:</p>
                <p className="text-emerald-800 text-[11px]">
                  Paybill: <strong>522522</strong> | Account: <strong>AGROKENYA</strong>
                </p>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">M-Pesa Reference Code</label>
                  <input
                    type="text"
                    value={mpesaRef}
                    onChange={(e) => setMpesaRef(e.target.value)}
                    placeholder="e.g. RK89XQ21"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs outline-none uppercase font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#087A4B] hover:bg-[#064E3B] text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-[#087A4B]/20 transition disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Confirming Order...' : 'Confirm Order'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
