-- AGRO KENYA - ROW LEVEL SECURITY POLICIES (02_rls_policies.sql)
-- Enable RLS and define security policies for all tables

-- Helper function to check if current authenticated user is a Manager
CREATE OR REPLACE FUNCTION public.is_manager()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND account_type = 'Manager'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are readable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile on signup"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile fields"
ON public.profiles FOR UPDATE
USING (auth.uid() = id OR public.is_manager());

CREATE POLICY "Only managers can delete profiles"
ON public.profiles FOR DELETE
USING (public.is_manager());


-- 2. PRODUCTS POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active products"
ON public.products FOR SELECT
USING (status = 'Active' OR seller_id = auth.uid() OR public.is_manager());

CREATE POLICY "Sellers can create products"
ON public.products FOR INSERT
WITH CHECK (auth.uid() = seller_id OR public.is_manager());

CREATE POLICY "Sellers can update own products"
ON public.products FOR UPDATE
USING (auth.uid() = seller_id OR public.is_manager());

CREATE POLICY "Sellers and managers can delete products"
ON public.products FOR DELETE
USING (auth.uid() = seller_id OR public.is_manager());


-- 3. SERVICES POLICIES
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
USING (status = 'Active' OR provider_id = auth.uid() OR public.is_manager());

CREATE POLICY "Providers can create services"
ON public.services FOR INSERT
WITH CHECK (auth.uid() = provider_id OR public.is_manager());

CREATE POLICY "Providers can update own services"
ON public.services FOR UPDATE
USING (auth.uid() = provider_id OR public.is_manager());

CREATE POLICY "Providers and managers can delete services"
ON public.services FOR DELETE
USING (auth.uid() = provider_id OR public.is_manager());


-- 4. ORDERS POLICIES
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers, sellers, and managers can view relevant orders"
ON public.orders FOR SELECT
USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR public.is_manager());

CREATE POLICY "Authenticated buyers can create orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = buyer_id OR public.is_manager());

CREATE POLICY "Sellers, buyers, and managers can update order status"
ON public.orders FOR UPDATE
USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR public.is_manager());


-- 5. ORDER_ITEMS POLICIES
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order items viewable by order participants or managers"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid() OR public.is_manager())
  )
);

CREATE POLICY "Buyers can insert order items"
ON public.order_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (orders.buyer_id = auth.uid() OR public.is_manager())
  )
);


-- 6. MESSAGES POLICIES
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants and managers can read messages"
ON public.messages FOR SELECT
USING (sender_id = auth.uid() OR receiver_id = auth.uid() OR public.is_manager());

CREATE POLICY "Users can send messages"
ON public.messages FOR INSERT
WITH CHECK (sender_id = auth.uid());


-- 7. FAVORITES POLICIES
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites"
ON public.favorites FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can insert favorites"
ON public.favorites FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their favorites"
ON public.favorites FOR DELETE
USING (user_id = auth.uid());


-- 8. MANAGER AUDIT LOGS POLICIES
ALTER TABLE public.manager_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only managers can read audit logs"
ON public.manager_audit_logs FOR SELECT
USING (public.is_manager());

CREATE POLICY "Only managers can insert audit logs"
ON public.manager_audit_logs FOR INSERT
WITH CHECK (public.is_manager());


-- 9. REPORTS POLICIES
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports, managers can view all"
ON public.reports FOR SELECT
USING (reporter_id = auth.uid() OR public.is_manager());

CREATE POLICY "Users can create reports"
ON public.reports FOR INSERT
WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Only managers can update reports"
ON public.reports FOR UPDATE
USING (public.is_manager());


-- 10. REVIEWS POLICIES
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews readable by everyone"
ON public.reviews FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create reviews"
ON public.reviews FOR INSERT
WITH CHECK (reviewer_id = auth.uid());


-- 11. PLATFORM SETTINGS POLICIES
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Platform settings readable by everyone"
ON public.platform_settings FOR SELECT
USING (true);

CREATE POLICY "Only managers can update platform settings"
ON public.platform_settings FOR UPDATE
USING (public.is_manager());
