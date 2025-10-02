import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProtectedRoutes from './Components/Common/ProtectedRoutes'

const HomePage = React.lazy(() => import('./Components/Common/Home'))
const SignInPage = React.lazy(() => import('./Components/Common/signIn'))
const SignUpPage = React.lazy(() => import('./Components/Common/signUp'))

const AdminDashboard = React.lazy(() => import('./Components/Admin/Dashboard'))
const AdminLandingPage = React.lazy(() => import('./Components/Admin/AdminHome'))

const UserFeedback = React.lazy(() => import('./Components/User/Feedback'))

function App() {
  const isLoggedin = localStorage.getItem('isLoggedin') || 'false'
  const userType = localStorage.getItem('role')

  return (
    <>
      <Suspense fallback={<div className='w-full h-150 flex items-center justify-center'>
        <h1 className='text-5xl font-extrabold '> Loading... </h1>
      </div>}>

        <Routes>
          {isLoggedin === 'false' ? (
            <>
              <Route path='/signIn' element={<SignInPage />} />
              <Route path='/signUp' element={<SignUpPage />} />
              <Route path='/' element={<HomePage />} />
            </>
          ) : (
            <>
              <Route element={<ProtectedRoutes />}>
                {userType != 'admin' ? (
                  <>
                    <Route path='/user-feedback' element={<UserFeedback />} />
                    <Route path="/" element={<Navigate to="/user-feedback" />} />
                  </>
                ) : (
                  <>
                    <Route path='/admin-home' element={<AdminLandingPage />} />
                    <Route path='/admin-dashboard' element={<AdminDashboard />} />
                    <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                  </>
                )}
              </Route>
            </>
          )}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
      <ToastContainer position='top-center' autoClose={2000} />
    </>
  )
}

export default App