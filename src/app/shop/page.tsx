import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Matcha Shop</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
        We carefully curate and stock a select tea collection. 
        <br />
        Check back soon for our latest drops!
      </p>
      
      <div className="rounded-2xl border border-dashed border-border p-12 bg-muted/20">
        <p className="text-muted-foreground italic">No products currently in stock.</p>
      </div>
    </div>
  );
}
