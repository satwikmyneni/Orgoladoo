import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HeroSection from '@/components/HeroSection';
import BenefitsBanner from '@/components/BenefitsBanner';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select(`*, product_variants (*)`)
        .eq('is_active', true);

      if (data) {
        const formatted: Product[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          ingredients: p.ingredients
            ? p.ingredients.split(',').map((i: string) => i.trim())
            : [],
          nutritionalHighlights: [],
          variants: p.product_variants,
          isOrganic: p.is_organic,
          imageUrl: p.image_url,
          isActive: p.is_active,
        }));

        setProducts(formatted);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <HeroSection />
      <BenefitsBanner />

      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Ladoos</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;