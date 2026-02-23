import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const WhatsAppSettings = () => {
    const [number, setNumber] = useState('');
    const [rowId, setRowId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNumber();
    }, []);

    const fetchNumber = async () => {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error(error);
            setLoading(false);
            return;
        }

        if (data) {
            setNumber(data.whatsapp_number);
            setRowId(data.id);
        }

        setLoading(false);
    };

    const handleSave = async () => {
        if (!number.trim()) {
            alert('Please enter a valid WhatsApp number');
            return;
        }

        if (rowId) {
            await supabase
                .from('settings')
                .update({ whatsapp_number: number })
                .eq('id', rowId);
        } else {
            const { data } = await supabase
                .from('settings')
                .insert({ whatsapp_number: number })
                .select()
                .single();

            if (data) setRowId(data.id);
        }

        alert('WhatsApp number updated');
    };

    if (loading) return null;

    return (
        <div className="p-5 bg-white shadow-sm rounded-xl border space-y-4">
            <h3 className="font-semibold text-lg">
                WhatsApp Settings
            </h3>

            <input
                className="w-full border p-2 rounded"
                value={number}
                onChange={e => setNumber(e.target.value)}
                placeholder="Enter WhatsApp number (with country code)"
            />

            <Button onClick={handleSave}>
                Save
            </Button>
        </div>
    );
};

export default WhatsAppSettings;