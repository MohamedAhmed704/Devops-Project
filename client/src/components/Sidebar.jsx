import { NavLink } from "react-router";
import routes from "../routes/routesConfig";

export default function Sidebar({ role }) {
  const items = routes[role] || [];

  return (
    <aside>
      <ul>
        {items.map(item => (
          <li key={item.path}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
