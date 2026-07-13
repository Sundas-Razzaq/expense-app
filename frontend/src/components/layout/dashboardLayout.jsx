import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">

            <Sidebar />

            <main>

                <DashboardHeader />

                <Outlet />

            </main>

        </div>
    );
};

export default DashboardLayout;