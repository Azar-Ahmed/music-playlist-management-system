import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';

const Sidebar = () => (
  <div className="w-60 h-full bg-gray-900 text-white p-5 space-y-6">
    <h1 className="text-2xl font-bold">Music Playlist</h1>
    <nav className="space-y-4">
      <Link to="/" className="flex items-center gap-3 hover:text-green-500"><FaHome /> Home</Link>
      <Link to="/search" className="flex items-center gap-3 hover:text-green-500"><FaSearch /> Search</Link>
      <Link to="/playlist" className="flex items-center gap-3 hover:text-green-500"><FaBook /> Your Playlist</Link>
      <Link to="/Profile" className="flex items-center gap-3 hover:text-green-500"><FaBook /> Your Profile</Link>
   
    </nav>
  </div>
);

export default Sidebar;
