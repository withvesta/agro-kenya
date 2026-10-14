-- AGRO KENYA - INITIAL SEED DATA (03_seed_data.sql)
-- Run this in the Supabase SQL Editor to populate initial products, services, profiles, and settings

-- 1. SEED PLATFORM SETTINGS
INSERT INTO public.platform_settings (marketplace_name, support_email, support_phone, default_location, require_listing_approval)
VALUES ('Agro Kenya Marketplace', 'support@agrokenya.co.ke', '+254 700 123 456', 'Nairobi, Kenya', false)
ON CONFLICT DO NOTHING;

-- 2. NOTE ON PROFILES & USERS:
-- Profile records are automatically linked to auth.users in Supabase.
-- Below are standard initial product and service records for immediate testing:

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
