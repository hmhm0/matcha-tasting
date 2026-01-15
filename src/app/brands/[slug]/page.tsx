import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_BRANDS, MOCK_PRODUCTS } from "@/lib/mock";
import { Star, ArrowRight } from "lucide-react";

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params
  const { slug }  = await params;  
  const brand = MOCK_BRANDS.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  const list = MOCK_PRODUCTS.filter((p) => p.brand_id === brand.id);

  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
       {/* Header */}
      <div className="mb-16">
        <Link href="/brands" className="mb-6 inline-flex items-center px-4 py-2 rounded-lg bg-white border border-border shadow-sm text-base font-medium text-muted-foreground transition-all hover:text-foreground hover:border-primary/30 hover:shadow-md">
             &larr; Back to Brands
        </Link>
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                 {brand.name.substring(0,2)}
            </div>
            <div>
                 <h1 className="text-4xl font-bold tracking-tight">{brand.name}</h1>
                 <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{brand.description}</p>
                 <a href={brand.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-primary hover:underline">
                    Visit Website
                 </a>
            </div>
        </div>
      </div>

      {/* Product Grid */}
      <h2 className="text-2xl font-bold mb-8">Matcha Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((product) => (
             <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-[4/3] w-full bg-muted relative">
                     {/* Placeholder Image */}
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-bold">
                       {product.name}
                   </div>
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={product.image_url} alt={product.name} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{product.name}</h3>
                        <div className="flex items-center bg-secondary px-2 py-1 rounded text-xs font-bold">
                           <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                           {product.avg_rating}
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                         <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                          <span className="flex items-center text-sm font-medium text-primary">
                             View Profile <ArrowRight className="ml-1 h-4 w-4" />
                          </span>
                    </div>
                </div>
             </Link>
        ))}
        {list.length === 0 && (
            <p className="text-muted-foreground">No products found for this brand.</p>
        )}
      </div>
    </div>
  );
}
