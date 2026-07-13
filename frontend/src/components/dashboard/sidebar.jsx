import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarConfig";

import { logoutUser } from "../../api/authAPI";
import { clearAuthSession } from "../../utils/helpers";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch {
            // Ignore API errors and clear local session.
        } finally {
            clearAuthSession();
            navigate("/login");
        }
    };

    return (
        <aside>
            <h2>Expense Tracker</h2>

            <nav>
                <ul>
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            title={item.title}
                            path={item.path}
                        />
                    ))}
                </ul>
            </nav>

            <button onClick={handleLogout}>
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;