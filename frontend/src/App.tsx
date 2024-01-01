import { useState } from "react"
import { useApolloClient } from "@apollo/client"
import {
  Routes,
  Route,
} from "react-router-dom"

import { Code2, UserRoundPlus, Home as HomeIcon } from "lucide-react"

import LandingPage from "./pages/LandingPage"
import FloatingNav from "./components/ui/floating-navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Docs from "./pages/Docs"

export default function App() {
  const [token, setToken] = useState<string | null>(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (token) {
    return (
      <Routes>
        <Route path="/" element={<Home logout={logout} />} />
      </Routes>
    )
  }

  return (
    <>
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
      </Routes>
    </>
  )
}
