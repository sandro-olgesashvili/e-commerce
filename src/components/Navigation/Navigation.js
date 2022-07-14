import { NavLink } from "react-router-dom";
import './Navigation.css'

const Navigation = () => {
  return (
    <ul className="list">
      <li className="link">
        <NavLink className='item'
          to="/"
          style={({ isActive }) =>
            isActive ? { color: "#5ECE7B", borderBottom:'2px solid #5ECE7B', fontWeight:'600'  } : { color: "#1D1F22" }
          }
        >
          all
        </NavLink>
      </li>
      <li className="link">
        <NavLink className='item'
          to="/clothes"
          style={({ isActive }) =>
            isActive ? { color: "#5ECE7B", borderBottom:'2px solid #5ECE7B' } : { color: "#1D1F22" }
          }
        >
          clothes
        </NavLink>
      </li>
      <li className="link">
        <NavLink className='item'
          to="/tech"
          style={({ isActive }) =>
            isActive ? { color: "#5ECE7B",  borderBottom:'2px solid #5ECE7B' } : { color: "#1D1F22" }
          }
        >
          tech
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
