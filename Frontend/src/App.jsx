import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const HomePage = React.lazy(() => import('./Components/LandingPages/Home'))
const SignInPage = React.lazy(() => import('./Components/LandingPages/signIn'))
const SignUpPage = React.lazy(() => import('./Components/LandingPages/signUp'))

const AdminDashboard = React.lazy(() => import('./Components/Admin/Dashboard'))

const UserFeedback = React.lazy(() => import('./Components/User/Feedback'))

function App() {

  return (
    <>
      <Suspense fallback={<div> Loading... </div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/signUp' element={<SignUpPage />} />

          <Route path='/admin-dashboard' element={<AdminDashboard />} />

          <Route path='/user-feedback' element={<UserFeedback />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App