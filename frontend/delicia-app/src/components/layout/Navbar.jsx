import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-white shadow">
      <h1 className="text-xl font-bold">Pastelería Delicia</h1>
      <ul className="flex gap-6">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
      </ul>
    </nav>
  );
}
export default Navbar;
