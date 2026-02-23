import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading)
    return <div className="container py-20 text-center">Loading...</div>;

  return (
    <main className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Our Collection
        </h1>
        <p className="text-muted-foreground">
          Browse our premium organic ladoos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Shop;