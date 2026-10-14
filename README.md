# 🌿 Agro Kenya — Together for a Thriving Agriculture

[![Live Deployment](https://img.shields.io/badge/Live%20Demo-agro--kenya.vercel.app-0B9A5B?style=for-the-badge&logo=vercel)](https://agro-kenya.vercel.app)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**Agro Kenya** is a modern, high-performance digital agricultural marketplace and cooperative networking platform designed to empower farmers, buyers, agricultural input vendors, equipment operators, and land owners across all 47 counties of Kenya.

---

## 🚀 Live Demo & Links

- **Production Website:** [https://agro-kenya.vercel.app](https://agro-kenya.vercel.app)
- **Admin / Staff Portal:** [https://agro-kenya.vercel.app/admin](https://agro-kenya.vercel.app/admin)

---

## 🌟 Key Features

### 🛒 1. Dynamic Multi-Category Marketplace
- **Produce & Crops:** Fresh maize, tea, coffee, avocados, tomatoes, potatoes, onions, dairy, and grains directly from verified Kenyan farmers.
- **Machinery & Equipment:** Tractors, combine harvesters, plows, and water pumps for hire or sale.
- **Farmland & Leasing:** Agricultural plots, greenhouse land, and long-term farm leases.
- **Inputs & Supplies:** Certified seeds, fertilizers, feeds, and drip irrigation kits.
- **Livestock & Veterinary:** Cattle, goats, poultry, and expert agro-consulting services.

### 🔍 2. Advanced Filtering & Search
- Real-time search across listings, seller names, and crop varieties.
- Filter by category, county/location (Nairobi, Nakuru, Uasin Gishu, Kiambu, Meru, etc.), price range, and verification status.

### 🛡️ 3. Verified Seller & Member Directory
- Dedicated profiles for smallholder farmers, large-scale producers, cooperatives, and agro-dealers.
- Verification badges (`Verified Farmer`, `Certified Dealer`, `Verified Cooperative`) ensuring transaction safety.
- Supplier ratings, review counts, and location verification.

### 💬 4. In-App Direct Messaging & Shopping Cart
- Built-in seller contact modal for instant price inquiries and negotiation.
- Interactive slide-out cart drawer with item quantity controls and order checkout preview.

### 📊 5. User & Vendor Dashboard
- Simple modal to publish new product listings with image upload, pricing per unit, county selector, and category tagging.
- Personal overview of active listings, messages, orders, and saved favorite items.

### 🔐 6. Administrative & Moderation Console (`/admin`)
- Accessible via `/admin` or `/manager-login`.
- Manage platform members, moderate listings, verify seller credentials, review reported content, and monitor analytics.
- **Demo Manager Credentials:**
  - **Email:** `onlyvee222@gmail.com`
  - **Password:** `AgroKenya360`

---

## 🛠️ Tech Stack

- **Frontend:** React 18 (Hooks, Context API, Components)
- **Bundler & Tooling:** Vite 5
- **Styling:** Tailwind CSS with custom earthy agricultural theme tokens
- **Icons:** Lucide React
- **Backend / Database:** Supabase (PostgreSQL, Realtime, Auth, Row Level Security)
- **Deployment:** Vercel (Edge Network with SPA Rewrites)

---

## 📂 Project Structure

```text
agro-kenya/
├── index.html                   # HTML entry point with meta tags & typography
├── package.json                 # Project dependencies & npm scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind theme colors (agro green palette)
├── vite.config.js               # Vite bundler configuration
├── vercel.json                  # Vercel SPA routing configuration
├── .env.example                 # Template for environment variables
├── supabase/
│   └── migrations/
│       └── 01_schema.sql        # Supabase database table definitions & RLS
└── src/
    ├── App.jsx                  # Root component & page routing logic
    ├── main.jsx                 # Application entry point
    ├── index.css                # Global styles and Tailwind directives
    ├── components/
    │   ├── admin/               # Admin dashboard modals & sidebar
    │   ├── cart/                # Shopping cart drawer & checkout modal
    │   ├── common/              # Verification badges, rating stars, buttons
    │   ├── layout/              # Navbar & Footer
    │   ├── marketplace/         # Listing cards, detail modals, filters
    │   └── user/                # Add listing & messaging modals
    ├── context/
    │   ├── AuthContext.jsx      # Authentication & user session state
    │   ├── CartContext.jsx      # Shopping cart state & actions
    │   ├── DataContext.jsx      # Listings, members, categories state
    │   └── ToastContext.jsx     # Notifications & feedback alerts
    ├── data/
    │   └── seedData.js          # Realistic Kenyan agricultural seed data
    ├── pages/
    │   ├── HomePage.jsx         # Hero banner, stats, quick categories
    │   ├── MarketplacePage.jsx  # Search, filter pills & listing grid
    │   ├── MembersPage.jsx      # Verified seller directory & profiles
    │   ├── MemberProfilePage.jsx# Single member profile & their listings
    │   ├── AboutPage.jsx        # Mission, vision, core team & story
    │   ├── ContactPage.jsx      # Inquiries, support & contact form
    │   ├── LoginPage.jsx        # Member authentication
    │   ├── RegisterPage.jsx     # Member registration (Farmer/Buyer/Dealer)
    │   ├── ManagerLoginPage.jsx # Secure administrator login
    │   ├── AdminDashboardPage.jsx # Full management & moderation portal
    │   ├── UserDashboardPage.jsx# Farmer/Buyer personal dashboard
    │   └── PolicyPages.jsx      # Terms, Privacy & Safety guidelines
    └── services/
        └── supabaseClient.js    # Supabase JS SDK client initialization
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js** (v18.0.0 or later)
- **npm** (v9.0.0 or later) or **yarn** / **pnpm**
- A free **[Supabase](https://supabase.com)** account (optional for local mock data mode)

### 2. Clone the Repository
```bash
git clone https://github.com/withvesta/agro-kenya.git
cd agro-kenya
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for Production
```bash
npm run build
npm run preview
```

---

## 🗄️ Database Setup (Supabase)

To connect your own Supabase instance:
1. Create a new project at [database.new](https://database.new).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/01_schema.sql` from this repository.
4. Paste and execute the SQL to generate all tables (`profiles`, `listings`, `categories`, `messages`, `orders`) with preconfigured Row Level Security policies.

---

## 🚢 Deployment (Vercel)

The application includes a `vercel.json` file configured for Single Page Application (SPA) routing:

```bash
# Deploy to Vercel
npx vercel --prod
```

Environment variables to add on Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 📄 License

This project is licensed under the MIT License — feel free to customize and expand it.

---

<p align="center">
  Made with 💚 for the Agricultural Community in Kenya 🇰🇪
</p>
