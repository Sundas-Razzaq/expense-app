import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarConfig";

import { logoutUser } from "../../api/authAPI";
import { clearAuthSession } from "../../utils/helpers";
import { useAuth } from "../../context/useAuth";

const Sidebar = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch {
            // Ignore API errors and clear local session.
        } finally {
            clearAuthSession();
            setUser(null);
            navigate("/login");
        }
    };

    return (
        <aside className="dashboard-sidebar">
            <div className="dashboard-sidebar__brand">
                <h2>Expense Tracker</h2>
                <p>Simple, reliable finance tracking.</p>
            </div>

            <nav>
                <ul>
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </ul>
            </nav>

            <button className="button button--ghost dashboard-sidebar__logout" onClick={handleLogout}>
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;