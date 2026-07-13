import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
    return (
        <li>
            <NavLink to={item.path} end={item.path === "/dashboard"}>
                {item.title}
            </NavLink>
        </li>
    );
};

export default SidebarItem;