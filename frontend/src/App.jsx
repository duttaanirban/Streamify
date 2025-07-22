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



const App = () => {
  // tanstack query
  const {data, isLoading, error} = useQuery({
    queryKey:["todos"],

    queryFn: async () => {
      const res = await axiosInstance.get("http://localhost:5001/api/auth/me")
      return res.data;
    },
    retry: false,
  });

  console.log(data);
  

  return (
    <div className="h-screen" data-theme="coffee">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/call" element={<Callpage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}
 
export default App