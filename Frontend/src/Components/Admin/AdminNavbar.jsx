import React from "react"
import { useNavigate } from "react-router-dom"

function AdminNavbar() {
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
          <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/admin-dashboard")}>
            Admin Panel
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/admin-home")}
              className="px-3 py-2 rounded-md text-white hover:bg-blue-500 transition-colors"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/admin-dashboard")}
              className="px-3 py-2 rounded-md text-white hover:bg-blue-500 transition-colors"
            >
              Feedbacks
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

export default AdminNavbar