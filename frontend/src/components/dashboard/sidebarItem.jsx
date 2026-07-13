import { NavLink } from "react-router-dom";

const SidebarItem = ({ title, path }) => {
    return (
        <li>
            <NavLink to={path} end={path === "/dashboard"}>
                {title}
            </NavLink>
        </li>
    );
};

export default SidebarItem;