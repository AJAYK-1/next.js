import React from "react"
import { useNavigate } from "react-router-dom"

function UserNavbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('role')
    localStorage.setItem('isLoggedin', 'false')
    navigate("/signIn")
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / App Name */}
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/user-feedback")}
          >
            Feedback App
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={() => navigate("/user-feedback")}
              className="px-3 py-2 rounded-md text-white hover:bg-blue-500 transition-colors"
            >
              Feedback Form
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-white hover:bg-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default UserNavbar
