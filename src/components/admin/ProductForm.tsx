import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import type { Tables } from '@/integrations/supabase/database.types';

type Product = Tables<'products'>;
type Variant = Tables<'product_variants'>;

const weights = ['250g', '500g', '1kg'];
const sweetnessOptions = ['jaggery', 'dates'];

interface Props {
    product: (Product & { product_variants?: Variant[] }) | null;
    onClose: () => void;
}

const ProductForm = ({ product, onClose }: Props) => {
    const [name, setName] = useState(product?.name ?? '');

    const generateSlug = (value: string) =>
        value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

    const [slug, setSlug] = useState(product?.slug ?? '');
    const [description, setDescription] = useState(product?.description ?? '');
    const [ingredients, setIngredients] = useState(product?.ingredients ?? '');
    const [nutritionalHighlights, setNutritionalHighlights] = useState(
        product?.nutritional_highlights ?? ''
    );
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [variants, setVariants] = useState<
        { weight: string; sweetness: string; price: number }[]
    >(
        product?.product_variants?.map(v => ({
            weight: v.weight,
            sweetness: v.sweetness ?? '',
            price: v.price
        })) ?? []
    );

    const handleImageUpload = async () => {
        if (!imageFile) return product?.image_url ?? null;

        const fileName = `product-${Date.now()}`;

        const { error } = await supabase.storage
            .from('product-images')
            .upload(fileName, imageFile);

        if (error) {
            alert(error.message);
            return null;
        }

        const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);

        return data.publicUrl;
    };

    const updateVariant = (
        weight: string,
        sweetness: string,
        price: number
    ) => {
        setVariants(prev => {
            const filtered = prev.filter(
                v => !(v.weight === weight && v.sweetness === sweetness)
            );
            return [...filtered, { weight, sweetness, price }];
        });
    };

    const getVariantPrice = (weight: string, sweetness: string) =>
        variants.find(
            v => v.weight === weight && v.sweetness === sweetness
        )?.price ?? '';

    const handleSave = async () => {
        const imageUrl = await handleImageUpload();

        let productId = product?.id;

        if (product) {
            await supabase
                .from('products')
                .update({
                    name,
                    slug,
                    description,
                    ingredients,
                    nutritional_highlights: nutritionalHighlights,
                    image_url: imageUrl
                })
                .eq('id', productId);
        } else {
            const { data } = await supabase
                .from('products')
                .insert({
                    name,
                    slug,
                    description,
                    ingredients,
                    nutritional_highlights: nutritionalHighlights,
                    image_url: imageUrl,
                    is_organic: true,
                    is_active: true
                })
                .select()
                .single();

            productId = data?.id;
        }

        if (productId) {
            await supabase
                .from('product_variants')
                .delete()
                .eq('product_id', productId);

            for (const v of variants) {
                await supabase.from('product_variants').insert({
                    product_id: productId,
                    weight: v.weight,
                    sweetness: v.sweetness,
                    price: v.price
                });
            }
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl p-6 rounded space-y-4 overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl font-bold">
                    {product ? 'Edit Product' : 'Add Product'}
                </h2>

                <input
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                    value={name}
                    onChange={e => {
                        const value = e.target.value;
                        setName(value);
                        setSlug(generateSlug(value));
                    }}
                />

                <input
                    className="w-full border p-2 rounded bg-muted"
                    value={slug}
                    readOnly
                />

                <textarea
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <input
                    placeholder="Ingredients (comma separated)"
                    className="w-full border p-2 rounded"
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                />

                <input
                    placeholder="Nutritional Highlights (comma separated)"
                    className="w-full border p-2 rounded"
                    value={nutritionalHighlights}
                    onChange={e => setNutritionalHighlights(e.target.value)}
                />

                <input
                    type="file"
                    onChange={e => setImageFile(e.target.files?.[0] ?? null)}
                />

                <div className="space-y-2">
                    <h3 className="font-semibold">Pricing</h3>

                    {weights.map(weight =>
                        sweetnessOptions.map(sweetness => (
                            <div key={`${weight}-${sweetness}`} className="flex gap-3">
                                <span className="w-24">{weight}</span>
                                <span className="w-24 capitalize">{sweetness}</span>

                                <input
                                    type="number"
                                    value={getVariantPrice(weight, sweetness)}
                                    onChange={e =>
                                        updateVariant(
                                            weight,
                                            sweetness,
                                            Number(e.target.value)
                                        )
                                    }
                                    className="border p-1 rounded flex-1"
                                />
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;