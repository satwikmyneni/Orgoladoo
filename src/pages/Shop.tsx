import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Shop = () => (
  <main className="container py-12 md:py-16">
    <div className="text-center mb-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Our Collection</h1>
      <p className="text-muted-foreground max-w-lg mx-auto">
        Browse our range of premium organic seed-based ladoos.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.filter(p => p.isActive).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </main>
);

export default Shop;
