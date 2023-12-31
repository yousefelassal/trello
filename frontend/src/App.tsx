import { useState } from "react"
import { useApolloClient } from "@apollo/client"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Login from "./components/Login"
import {
  Routes,
  Route,
} from "react-router-dom"

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
          token ? <Home logout={logout} /> : <LandingPage />
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </>
  )
}
