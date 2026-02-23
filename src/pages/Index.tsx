import HeroSection from '@/components/HeroSection';
import BenefitsBanner from '@/components/BenefitsBanner';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => (
  <main>
    <HeroSection />
    <BenefitsBanner />
    <section className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Our Ladoos</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Each ladoo is handcrafted with premium organic seeds, naturally sweetened and packed with nutrients.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.filter(p => p.isActive).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/shop">
          <Button variant="outline" size="lg">View All Products</Button>
        </Link>
      </div>
    </section>
  </main>
);

export default Index;
