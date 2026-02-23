import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import ProductForm from '@/components/admin/ProductForm';
import WhatsAppSettings from '@/components/admin/WhatsAppSettings';
import type { Tables } from '@/integrations/supabase/database.types';

type Product = Tables<'products'> & {
    product_variants?: Tables<'product_variants'>[];
};

const AdminDashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] =
        useState<Product | null>(null);

    const [analytics, setAnalytics] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
    });

    const fetchProducts = async () => {
        const { data } = await supabase
            .from('products')
            .select('*, product_variants (*)')
            .order('created_at', { ascending: false });

        if (data) setProducts(data as Product[]);
    };

    const fetchAnalytics = async () => {
        const { data } = await supabase.from('orders').select('*');

        if (!data) return;

        const totalRevenue = data
            .filter(o => o.status !== 'cancelled')
            .reduce((sum, o) => sum + o.total_amount, 0);

        setAnalytics({
            totalRevenue,
            totalOrders: data.length,
            pendingOrders: data.filter(o => o.status === 'pending').length,
            deliveredOrders: data.filter(o => o.status === 'delivered').length,
        });
    };

    useEffect(() => {
        fetchProducts();
        fetchAnalytics();
    }, []);

    const deleteProduct = async (id: string) => {
        await supabase.from('products').delete().eq('id', id);
        fetchProducts();
    };

    const toggleActive = async (product: Product) => {
        await supabase
            .from('products')
            .update({ is_active: !(product.is_active ?? false) })
            .eq('id', product.id);

        fetchProducts();
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">
                Admin Dashboard
            </h1>

            {/* Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border">
                    <p className="text-sm text-muted-foreground">
                        Total Revenue
                    </p>
                    <h2 className="text-2xl font-bold">
                        ${analytics.totalRevenue}
                    </h2>
                </div>

                <div className="bg-white p-4 rounded-xl border">
                    <p className="text-sm text-muted-foreground">
                        Total Orders
                    </p>
                    <h2 className="text-2xl font-bold">
                        {analytics.totalOrders}
                    </h2>
                </div>

                <div className="bg-white p-4 rounded-xl border">
                    <p className="text-sm text-muted-foreground">
                        Pending Orders
                    </p>
                    <h2 className="text-2xl font-bold text-yellow-600">
                        {analytics.pendingOrders}
                    </h2>
                </div>

                <div className="bg-white p-4 rounded-xl border">
                    <p className="text-sm text-muted-foreground">
                        Delivered Orders
                    </p>
                    <h2 className="text-2xl font-bold text-green-600">
                        {analytics.deliveredOrders}
                    </h2>
                </div>
            </div>

            <input
                placeholder="Search product..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border p-2 rounded w-full"
            />

            <WhatsAppSettings />

            <div className="flex justify-end">
                <Button onClick={() => setShowForm(true)}>
                    Add Product
                </Button>
            </div>

            <div className="grid gap-4">
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="p-5 bg-white rounded-xl border flex justify-between"
                    >
                        <div>
                            <h2 className="font-semibold text-lg">
                                {product.name}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {product.slug}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant={
                                    product.is_active ? 'secondary' : 'outline'
                                }
                                onClick={() => toggleActive(product)}
                            >
                                {product.is_active
                                    ? 'Deactivate'
                                    : 'Activate'}
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setEditingProduct(product);
                                    setShowForm(true);
                                }}
                            >
                                Edit
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteProduct(product.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="text-center text-muted-foreground py-10">
                        No products found.
                    </div>
                )}
            </div>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                        fetchProducts();
                    }}
                />
            )}
        </div>
    );
};

export default AdminDashboard;