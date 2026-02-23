import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
    const { signOut } = useAuth();

    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-6 space-y-6">
                <h2 className="text-2xl font-bold">Admin</h2>

                <nav className="space-y-3">

                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded ${isActive ? 'bg-primary text-white' : 'hover:bg-muted'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded ${isActive ? 'bg-primary text-white' : 'hover:bg-muted'
                            }`
                        }
                    >
                        Orders
                    </NavLink>

                </nav>

                <Button variant="outline" onClick={signOut}>
                    Logout
                </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;