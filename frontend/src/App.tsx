import { useState } from "react"
import { useApolloClient } from "@apollo/client"
import {
  Routes,
  Route,
} from "react-router-dom"

import { Code2, UserRoundPlus } from "lucide-react"

import LandingPage from "@/components/LandingPage"
import FloatingNav from "@/components/ui/floating-navbar"
import Home from "@/components/Home"
import Signup from "@/components/Signup"
import Login from "@/components/Login"
import Docs from "@/components/Docs"

export default function App() {
  const [token, setToken] = useState<string | null>(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          token ? 
          <Home logout={logout} /> 
          : 
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/documentation" element={<Docs />} />
      </Routes>
    </>
  )
}
