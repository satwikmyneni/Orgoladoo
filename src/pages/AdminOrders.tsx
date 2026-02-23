import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

const statuses = [
    'pending',
    'preparing',
    'dispatched',
    'delivered',
    'cancelled'
];

const AdminOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);

    const fetchOrders = async () => {
        const { data } = await supabase
            .from('orders')
            .select('*, order_items (*)')
            .order('created_at', { ascending: false });

        if (data) setOrders(data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        await supabase.from('orders').update({ status }).eq('id', id);
        fetchOrders();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Orders</h1>

            {orders.map(order => (
                <div key={order.id} className="border p-4 rounded space-y-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold">{order.order_number}</h2>
                            <p className="text-sm">
                                {order.customer_name} | {order.customer_phone}
                            </p>
                        </div>

                        <select
                            value={order.status}
                            onChange={e =>
                                updateStatus(order.id, e.target.value)
                            }
                            className="border p-1 rounded"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        {order.order_items.map((item: any) => (
                            <div key={item.id} className="text-sm">
                                {item.product_name} — {item.weight} — {item.sweetness} — Qty {item.quantity}
                            </div>
                        ))}
                    </div>

                    <div className="font-semibold">
                        Total: ${order.total_amount}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminOrders;