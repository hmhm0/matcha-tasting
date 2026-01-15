import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { MOCK_BRANDS } from "@/lib/mock";
import RatingModal from "@/components/RatingModal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background">
        <div className="container relative mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Discover Your <span className="text-primary">Perfect Matcha</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore taste profiles from the world&apos;s most renowned Japanese tea houses.
            Select a brand to view their ceremonial collection.
          </p>
          <div className="flex justify-center gap-4">
            <RatingModal />
          </div>
        </div>
      </section>

      {/* Brand Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {MOCK_BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group relative aspect-square flex flex-col items-center justify-center bg-white border border-border shadow-sm rounded-2xl p-6 transition-all hover:shadow-lg hover:border-primary/40 hover:-translate-y-1"
              >
                 {/* Brand Logo Placeholder */}
                 <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                     <span className="text-2xl font-bold text-primary group-hover:text-white">
                        {brand.name.substring(0, 2)}
                     </span>
                 </div>
                 
                 <h3 className="text-lg font-bold text-center group-hover:text-primary transition-colors">
                   {brand.name}
                 </h3>
                 
                 <div className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <Leaf className="h-3 w-3" />
                    {brand.matchas_count} Blends
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
