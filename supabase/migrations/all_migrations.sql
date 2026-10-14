-- =======================================================
-- AGRO KENYA - COMPLETE COMBINED DATABASE MIGRATION
-- Run this whole script in Supabase SQL Editor (SQL Query window)
-- =======================================================

-- 1. EXTENSIONS & SCHEMA CREATION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    business_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    whatsapp TEXT,
    location TEXT DEFAULT 'Nairobi, Kenya',
    county TEXT DEFAULT 'Nairobi',
    town TEXT DEFAULT 'CBD',
    account_type TEXT NOT NULL CHECK (account_type IN ('Farmer', 'Buyer', 'Seller', 'Service Provider', 'Manager')),
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
    bio TEXT,
    verified BOOLEAN DEFAULT FALSE,
    account_status TEXT DEFAULT 'Active' CHECK (account_status IN ('Active', 'Suspended')),
    first_login_changed_password BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    seller_name TEXT NOT NULL,
    seller_image TEXT,
    seller_verified BOOLEAN DEFAULT FALSE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    subcategory TEXT,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    unit TEXT DEFAULT 'kg',
    quantity_available TEXT DEFAULT 'Available on request',
    stock_count NUMERIC(10, 2) DEFAULT 100 CHECK (stock_count >= 0),
    location TEXT DEFAULT 'Kenya',
    county TEXT DEFAULT 'Nairobi',
    town TEXT DEFAULT 'CBD',
    image_url TEXT,
    images TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Pending Review', 'Archived')),
    featured BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_name TEXT NOT NULL,
    provider_image TEXT,
    provider_verified BOOLEAN DEFAULT FALSE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    subcategory TEXT,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    pricing_unit TEXT DEFAULT 'per acre',
    location TEXT DEFAULT 'Kenya',
    county TEXT DEFAULT 'Nairobi',
    town TEXT DEFAULT 'CBD',
    image_url TEXT,
    images TEXT[] DEFAULT '{}',
    availability_status TEXT DEFAULT 'Available' CHECK (availability_status IN ('Available', 'Booked', 'Unavailable')),
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Archived')),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    seller_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    order_number TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'dispatched', 'completed', 'cancelled')),
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    delivery_fee NUMERIC(12, 2) DEFAULT 0 CHECK (delivery_fee >= 0),
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    delivery_location TEXT NOT NULL,
    buyer_phone TEXT NOT NULL,
    buyer_name TEXT,
    payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    payment_mode TEXT DEFAULT 'Payment on Delivery',
    payment_reference TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name_snapshot TEXT NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    line_total NUMERIC(12, 2) NOT NULL CHECK (line_total >= 0)
);

-- MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    listing_id TEXT,
    listing_title TEXT,
    message TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAVORITES TABLE
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_product UNIQUE (user_id, product_id),
    CONSTRAINT unique_user_service UNIQUE (user_id, service_id)
);

-- MANAGER AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.manager_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    manager_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reporter_name TEXT,
    reported_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    reported_user_name TEXT,
    listing_id TEXT,
    listing_title TEXT,
    reason TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved', 'Dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewer_name TEXT,
    reviewed_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating NUMERIC(3, 1) CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PLATFORM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.platform_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    marketplace_name TEXT DEFAULT 'Agro Kenya Marketplace',
    support_email TEXT DEFAULT 'support@agrokenya.co.ke',
    support_phone TEXT DEFAULT '+254 700 123 456',
    default_location TEXT DEFAULT 'Nairobi, Kenya',
    require_listing_approval BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_county ON public.products(county);
CREATE INDEX IF NOT EXISTS idx_products_seller ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_provider ON public.services(provider_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON public.orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON public.orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(sender_id, receiver_id);

-- TRIGGER FOR TIMESTAMP UPDATES
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_services_modtime BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_orders_modtime BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_timestamp();


-- 2. ROW LEVEL SECURITY POLICIES
CREATE OR REPLACE FUNCTION public.is_manager()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND account_type = 'Manager'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile on signup" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile fields" ON public.profiles FOR UPDATE USING (auth.uid() = id OR public.is_manager());
CREATE POLICY "Only managers can delete profiles" ON public.profiles FOR DELETE USING (public.is_manager());

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (status = 'Active' OR seller_id = auth.uid() OR public.is_manager());
CREATE POLICY "Sellers can create products" ON public.products FOR INSERT WITH CHECK (auth.uid() = seller_id OR public.is_manager());
CREATE POLICY "Sellers can update own products" ON public.products FOR UPDATE USING (auth.uid() = seller_id OR public.is_manager());
CREATE POLICY "Sellers and managers can delete products" ON public.products FOR DELETE USING (auth.uid() = seller_id OR public.is_manager());

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (status = 'Active' OR provider_id = auth.uid() OR public.is_manager());
CREATE POLICY "Providers can create services" ON public.services FOR INSERT WITH CHECK (auth.uid() = provider_id OR public.is_manager());
CREATE POLICY "Providers can update own services" ON public.services FOR UPDATE USING (auth.uid() = provider_id OR public.is_manager());
CREATE POLICY "Providers and managers can delete services" ON public.services FOR DELETE USING (auth.uid() = provider_id OR public.is_manager());

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Buyers, sellers, and managers can view relevant orders" ON public.orders FOR SELECT USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR public.is_manager());
CREATE POLICY "Authenticated buyers can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = buyer_id OR public.is_manager());
CREATE POLICY "Sellers, buyers, and managers can update order status" ON public.orders FOR UPDATE USING (buyer_id = auth.uid() OR seller_id = auth.uid() OR public.is_manager());

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Order items viewable by order participants or managers" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid() OR public.is_manager())
  )
);
CREATE POLICY "Buyers can insert order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (orders.buyer_id = auth.uid() OR public.is_manager())
  )
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants and managers can read messages" ON public.messages FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid() OR public.is_manager());
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (sender_id = auth.uid());

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own favorites" ON public.favorites FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert favorites" ON public.favorites FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete their favorites" ON public.favorites FOR DELETE USING (user_id = auth.uid());

ALTER TABLE public.manager_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only managers can read audit logs" ON public.manager_audit_logs FOR SELECT USING (public.is_manager());
CREATE POLICY "Only managers can insert audit logs" ON public.manager_audit_logs FOR INSERT WITH CHECK (public.is_manager());

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own reports, managers can view all" ON public.reports FOR SELECT USING (reporter_id = auth.uid() OR public.is_manager());
CREATE POLICY "Users can create reports" ON public.reports FOR INSERT WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "Only managers can update reports" ON public.reports FOR UPDATE USING (public.is_manager());

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews readable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT WITH CHECK (reviewer_id = auth.uid());

ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Platform settings readable by everyone" ON public.platform_settings FOR SELECT USING (true);
CREATE POLICY "Only managers can update platform settings" ON public.platform_settings FOR UPDATE USING (public.is_manager());


-- 3. SEED INITIAL DATA
INSERT INTO public.platform_settings (marketplace_name, support_email, support_phone, default_location, require_listing_approval)
VALUES ('Agro Kenya Marketplace', 'support@agrokenya.co.ke', '+254 700 123 456', 'Nairobi, Kenya', false)
ON CONFLICT DO NOTHING;

INSERT INTO public.products (id, seller_name, name, description, category, subcategory, price, unit, quantity_available, stock_count, location, county, town, image_url, images, status, featured, views)
VALUES 
(
  'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  'John Mwangi',
  'Fresh Farm Tomatoes (Anna F1)',
  'Grade-A firm red Anna F1 tomatoes harvested fresh daily from greenhouse drip irrigation. Long shelf life, excellent for markets & supermarket supply. Minimum order 5 crates.',
  'Farm Produce',
  'Tomatoes',
  80.00,
  'kg',
  '2,500 kg available',
  2500,
  'Nakuru, Kenya',
  'Nakuru',
  'Naivasha',
  'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1546470427-227c7369a639?auto=format&fit=crop&q=80&w=800'],
  'Active',
  true,
  412
),
(
  'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
  'Mary Wanjiku',
  'Dry White Maize (Dry Harvest 2026)',
  'Clean, sun-dried white grain maize with moisture content below 13.5%. Free from aflatoxin, sorted and bagged in 90kg bags ready for millers and grain traders.',
  'Farm Produce',
  'Maize',
  2500.00,
  '90kg bag',
  '450 bags available',
  450,
  'Trans Nzoia, Kenya',
  'Trans Nzoia',
  'Kitale',
  'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800'],
  'Active',
  true,
  620
),
(
  'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
  'AgroTech Solutions',
  'John Deere 5075E Tractor (75 HP, 4WD)',
  'Brand new 75HP John Deere 4WD Tractor. Ideal for heavy tillage, disc ploughing, planting, and trailer hauling in rough terrain. Includes 2 years manufacturer warranty & free initial service.',
  'Machinery',
  'Tractors',
  2500000.00,
  'unit',
  '3 units available',
  3,
  'Nairobi, Kenya',
  'Nairobi',
  'Westlands',
  'https://images.unsplash.com/photo-1530267981675-b058f8921c5b?auto=format&fit=crop&q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1530267981675-b058f8921c5b?auto=format&fit=crop&q=80&w=800'],
  'Active',
  true,
  1250
),
(
  'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
  'Mary Wanjiku',
  'Certified Hybrid Maize Seed (DK 777)',
  'KEPHIS certified Dekalb 777 hybrid seed maize. Drought tolerant with high yield potential (35-40 bags per acre). Treated against cutworms and early pests.',
  'Agricultural Inputs',
  'Hybrid Seeds',
  3800.00,
  '25kg bag',
  '120 bags available',
  120,
  'Trans Nzoia, Kenya',
  'Trans Nzoia',
  'Kitale',
  'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800'],
  'Active',
  false,
  310
)
ON CONFLICT DO NOTHING;

INSERT INTO public.services (id, provider_name, name, description, category, subcategory, price, pricing_unit, location, county, town, image_url, images, availability_status, status, featured)
VALUES
(
  'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b',
  'Grace Njeri',
  'Fertile Farmland for Lease (5 Acres)',
  'Prime 5-acre agricultural plot available for long-term lease in Naivasha. Features deep red volcanic soil, river water frontage with power line connected for pumping.',
  'Land Leasing',
  'Farmland for Lease',
  350000.00,
  'year (all 5 acres)',
  'Nakuru, Kenya',
  'Nakuru',
  'Naivasha',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'],
  'Available',
  'Active',
  true
),
(
  'f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c',
  'AgroTech Solutions',
  'Solar Drip Irrigation Kit (1 Acre Complete)',
  'Complete 1-acre solar-powered drip irrigation package including 500W solar pump, 5000L tank stand, 16mm UV resistant drip lines with emitters.',
  'Agricultural Services',
  'Irrigation Installation',
  150000.00,
  'package installed',
  'Kiambu, Kenya',
  'Kiambu',
  'Thika',
  'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800'],
  'Available',
  'Active',
  true
),
(
  'a7b8c9d0-e1f2-3a4b-5c6d-7e8f9a0b1c2d',
  'AgroTech Solutions',
  'Tractor Hire & Land Ploughing Services',
  'Professional disc ploughing, harrowing, and ridging services with operator and diesel provided. Available across Nakuru, Uasin Gishu and Narok.',
  'Agricultural Services',
  'Ploughing & Tilling',
  3500.00,
  'acre',
  'Nakuru, Kenya',
  'Nakuru',
  'Nakuru Town',
  'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800'],
  'Available',
  'Active',
  false
)
ON CONFLICT DO NOTHING;
