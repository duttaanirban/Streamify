import { Route, Routes } from "react-router"
import Homepage from "./pages/HomePage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import Loginpage from "./pages/LoginPage.jsx"
import Callpage from "./pages/CallPage.jsx"
import ChatPage from "./pages/Chatpage.jsx"
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom";
import { PageLoader } from "./components/PageLoader.jsx"
import useAuthUser from "./hooks/useAuthUser.js"
import Layout from "./components/Layout.jsx"
import { useThemeStore } from "./store/useThemeSelector.jsx"

const App = () => {
  
  const {isLoading, authUser} = useAuthUser();
  const {theme} = useThemeStore();


  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  if (isLoading) return <PageLoader />
  

  return (
    <div className="h-screen" data-theme={theme}>
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
        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )}/>
        <Route path="/call/:id" element={
          isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <Callpage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        } />
        <Route path="/chat/:id"
        element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
            <ChatPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
      
    </Routes>
      <Toaster />
    </div>
  )
}
 
export default App;