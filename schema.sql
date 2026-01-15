-- Brands Table
CREATE TABLE brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT
);

-- Products Table (Matchas)
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10, 2),
  description TEXT,
  image_url TEXT,
  
  -- Aggregated Taste Profile (Updated via trigger or function)
  avg_rating DECIMAL(3, 2) DEFAULT 0,
  avg_sweetness DECIMAL(3, 2) DEFAULT 0,
  avg_bitterness DECIMAL(3, 2) DEFAULT 0,
  avg_umami DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID DEFAULT auth.uid(), -- Links to Supabase Auth User
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  sweetness INTEGER CHECK (sweetness >= 1 AND sweetness <= 5),
  bitterness INTEGER CHECK (bitterness >= 1 AND bitterness <= 5),
  umami INTEGER CHECK (umami >= 1 AND umami <= 5),
  comment TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies (Public Read, Authenticated Write for Reviews)
CREATE POLICY "Public brands are viewable by everyone" ON brands FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
