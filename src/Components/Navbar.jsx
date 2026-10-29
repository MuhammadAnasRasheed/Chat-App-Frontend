import { useAuthStore } from "../Store/useAuthstore"
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const Navbar = () => {
  const {Authuser,logout}=useAuthStore();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Chatty
        </Link>
      </div>

      {/* Right: Links with Icons */}
      <div className="flex items-center gap-6">
        {Authuser &&(
          <>
        <Link
          to="/profile"
          className="flex items-center gap-2 text-base font-medium hover:text-primary transition"
        >
          <User className="w-5 h-5 inline-block" /> <span>Profile</span>
        </Link>
        <button
          className="flex items-center gap-2 text-base font-medium text-red-500 hover:text-red-600 transition cursor-pointer"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 inline-block" /> <span>Logout</span>
        </button>
        </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
