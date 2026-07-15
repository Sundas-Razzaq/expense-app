import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
    return (
        <li className="sidebar-item">
            <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                    `sidebar-link${isActive ? " sidebar-link--active" : ""}`
                }
            >
                <span
                    className={`sidebar-link__icon sidebar-link__icon--${item.icon}`}
                    aria-hidden="true"
                />

                {item.title}
            </NavLink>
        </li>
    );
};

export default SidebarItem;