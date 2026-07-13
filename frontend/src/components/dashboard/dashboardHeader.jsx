import { useLocation } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import { sidebarItems } from "./sidebarConfig";

const DashboardHeader = () => {
    const { pathname } = useLocation();
    const { user } = useAuth();

    const currentPage = sidebarItems.find(
        (item) => item.path === pathname
    );

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1>{currentPage?.title ?? "Dashboard"}</h1>

                <p>{currentDate}</p>
            </div>

            <div className="header-right">
                <h3>{user?.name}</h3>

                <p>{user?.email}</p>
            </div>
        </header>
    );
};

export default DashboardHeader;