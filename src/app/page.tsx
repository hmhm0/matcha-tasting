import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock";

export default function Home() {
  const featuredMatchas = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,83,45,0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Find Your Perfect <span className="text-primary">Matcha</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Explore taste profiles, read community reviews, and discover the nuances of ceremonial grade matcha from Japan&apos;s finest tea houses.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/brands"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Browse Brands
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Trending Matchas</h2>
            <Link href="/market" className="group flex items-center text-primary font-medium hover:underline">
              View all <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMatchas.map((product) => (
              <div key={product.id} className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-square w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">Brand ID: {product.brand_id} (Ippodo)</p>
                    </div>
                    <div className="flex items-center bg-primary/10 px-2 py-1 rounded text-xs font-bold text-primary">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {product.avg_rating}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sweetness</span>
                      <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(product.avg_sweetness / 5) * 100}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Umami</span>
                      <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(product.avg_umami / 5) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-bold text-lg">${product.price}</span>
                    <button className="rounded-full bg-accent text-accent-foreground p-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
