import Link from "next/link";
import { MOCK_BRANDS } from "@/lib/mock";
import { ArrowUpRight } from "lucide-react";

export default function BrandsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Curated Brands</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover the finest matcha producers from Japan and beyond.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:bg-accent/5 hover:shadow-lg"
          >
            <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl bg-muted/50">
               {/* Brand Logo / Image Placeholder */}
               <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-muted-foreground/20">
                  {brand.name.substring(0, 2)}
               </div>
            </div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{brand.name}</h2>
              <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            
            <p className="mt-2 line-clamp-2 text-muted-foreground flex-1">
              {brand.description}
            </p>
            
            <div className="mt-6 flex items-center justify-between text-sm">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                    {brand.matchas_count} Matchas
                </span>
                <span className="text-muted-foreground">View Collection</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
