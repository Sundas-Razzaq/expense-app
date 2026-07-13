import { useLocation } from "react-router-dom";

import { useAuth } from "../../context/useAuth";

const pageTitles = {
    "/dashboard": "Dashboard",

    "/dashboard/transactions": "Transactions",

    "/dashboard/analytics": "Analytics",
};

const DashboardHeader = () => {
    const location = useLocation();

    const { user } = useAuth();

    return (
        <header>

            <div>

                <h1>
                    {pageTitles[location.pathname]}
                </h1>

                <p>
                    Welcome,
                    {" "}
                    {user?.name}
                </p>

            </div>

        </header>
    );
};

export default DashboardHeader;