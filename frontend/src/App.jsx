import { Route, Routes } from "react-router"
import Homepage from "./pages/Homepage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import Loginpage from "./pages/LoginPage.jsx"
import Callpage from "./pages/Callpage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom";
import { PageLoader } from "./components/PageLoader.jsx"
import useAuthUser from "./hooks/useAuthUser.js"
import Layout from "./components/Layout.jsx"

const App = () => {
  
  const {isLoading, authUser} = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  if (isLoading) return <PageLoader />
  

  return (
    <div className="h-screen" data-theme="forest">
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded? (
          <Layout showSidebar={true}>
            <Homepage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login": "/onboarding"} />
        )} />
        <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to={
          isOnboarded ? "/" : "/onboarding"
        } />} />
        <Route path="/login" element={!isAuthenticated ? <Loginpage />  : <Navigate to={
          isOnboarded ? "/" : "/onboarding"
        } />} />
        <Route path="/onboarding" element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthenticated ? (
          !isOnboarded ? (<OnboardingPage />) : (<Navigate to="/" />)
        ) : (<Navigate to="/login" />) }/>
        <Route path="/call" element={isAuthenticated ? <Callpage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}
 
export default App