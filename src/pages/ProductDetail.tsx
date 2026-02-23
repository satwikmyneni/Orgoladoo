import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SweetnessOption, WeightOption } from '@/types/product';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<any>(null);
  const [sweetness, setSweetness] =
    useState<SweetnessOption | null>(null);
  const [selectedWeight, setSelectedWeight] =
    useState<WeightOption>('250g');

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from('products')
        .select(`*, product_variants (*)`)
        .eq('slug', slug)
        .single();

      if (data) setProduct(data);
    };

    fetchProduct();
  }, [slug]);

  /* ---------------- PRICE LOGIC ---------------- */

  const lowestPrice = useMemo(() => {
    if (!product?.product_variants?.length) return 0;
    return Math.min(
      ...product.product_variants.map((v: any) => v.price)
    );
  }, [product]);

  const currentVariant = product?.product_variants?.find(
    (v: any) =>
      v.weight === selectedWeight &&
      v.sweetness === sweetness
  );

  const displayPrice =
    currentVariant?.price ?? lowestPrice;

  /* ---------------- ADD TO CART ---------------- */

  const handleAddToCart = () => {
    if (!sweetness) {
      toast({
        title: 'Select Sweetness',
        description: 'Please choose Jaggery or Dates.',
        variant: 'destructive',
      });
      return;
    }

    if (!currentVariant) {
      toast({
        title: 'Variant not available',
        variant: 'destructive',
      });
      return;
    }

    addToCart({
      productId: product.id,
      productName: product.name,
      sweetness,
      weight: selectedWeight,
      price: currentVariant.price,
      imageUrl: product.image_url,
    });

    toast({ title: 'Added to cart!' });
  };

  if (!product)
    return (
      <div className="container py-20 text-center">
        Loading...
      </div>
    );

  /* ---------------- UNIQUE WEIGHTS ---------------- */

  const uniqueWeights = [
    ...new Set(
      product.product_variants.map((v: any) => v.weight)
    ),
  ];

  return (
    <main className="container py-8 md:py-12">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          {product.is_organic && (
            <Badge variant="secondary">
              🌿 100% Organic
            </Badge>
          )}

          <h1 className="text-3xl font-bold mt-4 mb-4">
            {product.name}
          </h1>

          <p className="mb-6">{product.description}</p>

          {/* INGREDIENTS */}
          {product.ingredients && (
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-2">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients
                  .split(',')
                  .map((item: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 rounded-full bg-muted"
                    >
                      {item.trim()}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* NUTRITIONAL HIGHLIGHTS */}
          {product.nutritional_highlights && (
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-2">
                Nutritional Highlights
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.nutritional_highlights
                  .split(',')
                  .map((item: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 rounded-full border"
                    >
                      {item.trim()}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Sweetness */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">
              Sweetness *
            </h3>

            <div className="flex gap-3">
              {(['jaggery', 'dates'] as SweetnessOption[]).map(
                opt => (
                  <button
                    key={opt}
                    onClick={() => setSweetness(opt)}
                    className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all
                      ${sweetness === opt
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card hover:border-primary/50'
                      }`}
                  >
                    {opt.charAt(0).toUpperCase() +
                      opt.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Weight (always visible now) */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">
              Weight *
            </h3>

            <div className="flex gap-3">
              {uniqueWeights.map((weight: string) => (
                <button
                  key={weight}
                  onClick={() =>
                    setSelectedWeight(weight as WeightOption)
                  }
                  className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all
                    ${selectedWeight === weight
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card hover:border-primary/50'
                    }`}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div className="text-2xl font-bold mb-6">
            ${displayPrice}
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;