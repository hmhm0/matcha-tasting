import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS, MOCK_BRANDS } from "@/lib/mock";
import { TasteProfileChart } from "@/components/TasteProfileChart";
import { ReviewForm } from "@/components/ReviewForm";
import { Star, ShoppingCart } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const brand = MOCK_BRANDS.find((b) => b.id === product.brand_id);

  const tasteData = [
    { subject: "Sweetness", A: product.avg_sweetness, fullMark: 5 },
    { subject: "Bitterness", A: product.avg_bitterness, fullMark: 5 },
    { subject: "Umami", A: product.avg_umami, fullMark: 5 },
    // Add dummy metrics to make the radar chart look better (3 points is a triangle)
    // Maybe Aroma and Color? Mock data doesn't have it, but we can compute or static for now
    { subject: "Aroma", A: 4.0, fullMark: 5 }, 
    { subject: "Color", A: 4.5, fullMark: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <Link href={brand ? `/brands/${brand.slug}` : "/brands"} className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        &larr; Back to {brand?.name || "Brands"}
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Column: Image & Chart */}
        <div className="space-y-8">
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-muted relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                <div className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-sm font-medium shadow-sm backdrop-blur-sm">
                    {brand?.name}
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 text-center text-lg font-semibold">Taste Profile</h3>
                <TasteProfileChart data={tasteData} />
            </div>
        </div>

        {/* Right Column: Details & Reviews */}
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 font-bold text-foreground">{product.avg_rating}</span>
                </div>
                <span className="text-muted-foreground">({product.review_count} reviews)</span>
            </div>

            <div className="mt-8">
                <h2 className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</h2>
                <p className="text-sm text-muted-foreground">Price per 30g tin</p>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {product.description}
            </p>

            <div className="mt-8">
                <ReviewForm productId={product.id} />
            </div>

            <div className="mt-12 border-t border-border pt-8">
                <h3 className="mb-6 text-xl font-bold">Community Ratings</h3>
                <div className="space-y-4">
                     <div className="flex items-center justify-between">
                         <span className="text-muted-foreground">Sweetness</span>
                         <span className="font-medium">{product.avg_sweetness}/5</span>
                     </div>
                     <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${(product.avg_sweetness / 5) * 100}%` }} />
                     </div>

                     <div className="flex items-center justify-between pt-2">
                         <span className="text-muted-foreground">Umami</span>
                         <span className="font-medium">{product.avg_umami}/5</span>
                     </div>
                     <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${(product.avg_umami / 5) * 100}%` }} />
                     </div>

                     <div className="flex items-center justify-between pt-2">
                         <span className="text-muted-foreground">Bitterness</span>
                         <span className="font-medium">{product.avg_bitterness}/5</span>
                     </div>
                     <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${(product.avg_bitterness / 5) * 100}%` }} />
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
