import { useApolloClient } from "@apollo/client"
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"

import { Code2, UserRoundPlus, Home as HomeIcon } from "lucide-react"

import LandingPage from "./pages/LandingPage"
import Spotlight from "@/components/ui/spotlights";
import FloatingNav from "./components/ui/floating-navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Docs from "./pages/Docs"
import Board from "./pages/Board"
import CardModal from "./components/CardModal"
import Header from "./components/Header"
import useHasMounted from './hooks/useHasMounted'
import { useTokenValue } from "./hooks/useTokenValue"
import Footer from "./components/Footer";

export default function App() {
  const {token, setToken} = useTokenValue()
  const client = useApolloClient()
  const hasMounted = useHasMounted()
  const location = useLocation()
  const previousLocation = location.state?.previousLocation

  if (!hasMounted) {
    return null
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (token) {
    return (
      <>
        <Header logout={logout} />
        <Routes location={previousLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Navigate to="/" replace={true} />} />
          <Route path="/signup" element={<Navigate to="/" replace={true} />} />
          <Route path="/:id" element={<Board />} />
          <Route path="/documentation" element={
            <>
            <div className="absolute h-[40rem] md:min-h-screen w-full rounded-md flex items-center justify-center antialiased overflow-hidden">
              <Spotlight
                className="top-10 left-0 md:left-60 md:-top-20"
                fill="#3478F3"
              />
            </div>
            <Docs />
            </>
          } />
        </Routes>

        {previousLocation && (
          <Routes>
            <Route path="/:id/:id" element={<CardModal previousLocation={previousLocation} />} />
          </Routes>
        )}
      </>
    )
  }

  return (
    <>
      <div className="absolute h-[40rem] md:min-h-screen w-full rounded-md flex items-center justify-center antialiased overflow-hidden">
        <Spotlight
          className="top-10 left-0 md:left-60 md:-top-20"
          fill={
            location.pathname === "/login"
              ? "#3478F3"
              : location.pathname === "/signup"
              ? "#F3B334"
              : location.pathname === "/documentation"
              ? "#F3345B"
              : "white"
            }
        />
      </div>
      <Routes>
        <Route path="/" element={
          <>
            <FloatingNav 
              navItems={[
                { name: "Docs", link: "/documentation", icon: <Code2 /> },
                { name: "Signup", link: "/signup", icon: <UserRoundPlus /> },
              ]}
            />
            <LandingPage />
          </>
        } />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/documentation" element={
          <>
            <FloatingNav 
              navItems={[
                { name: "Home", link: "/", icon: <HomeIcon /> },
                { name: "Signup", link: "/signup", icon: <UserRoundPlus /> },
              ]}
            />
            <Docs />
          </>
        } />
        <Route path="/*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      <Footer />
    </>
  )
}
