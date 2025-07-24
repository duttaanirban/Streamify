import { Route, Routes } from "react-router"
import Homepage from "./pages/Homepage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import Loginpage from "./pages/LoginPage.jsx"
import Callpage from "./pages/Callpage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./lib/axios.js"
import { Navigate } from "react-router-dom";



























const App = () => {
  // tanstack query
  const {data:authData, isLoading, error} = useQuery({
    queryKey:["authUser"],

    queryFn: async () => {
      const res = await axiosInstance.get("http://localhost:5001/api/auth/me")
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user;
  

  return (
    <div className="h-screen" data-theme="coffee">
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Loginpage />  : <Navigate to="/" />} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <Callpage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}
 
export default App