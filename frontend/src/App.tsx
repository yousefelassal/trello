import { useApolloClient } from "@apollo/client"
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import { Code2, UserRoundPlus, Home as HomeIcon } from "lucide-react"

import LandingPage from "./pages/LandingPage"
import FloatingNav from "./components/ui/floating-navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Docs from "./pages/Docs"
import BoardTest from "./pages/BoardTest"
import Header from "./components/Header"
import useHasMounted from './hooks/useHasMounted'
import { useTokenValue } from "./hooks/useTokenValue"

export default function App() {
  const {token, setToken} = useTokenValue()
  const client = useApolloClient()
  const hasMounted = useHasMounted()

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
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Navigate to="/" replace={true} />} />
            <Route path="/signup" element={<Navigate to="/" replace={true} />} />
            <Route path="/:id" element={<BoardTest />} />
          </Routes>
        </div>
      </>
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
        <Route path="/*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  )
}
