import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

export default function Home({logout}: {logout: () => void}) {
  const { data, loading, error } = useQuery(ME)

  if (error) return <div>{error.message}</div>
  
  if (loading) return <div>Loading...</div>

  return (
    <>
    <div className="fixed -z-10 h-screen w-full bg-black bg-dot-white/[0.2] flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
    <div className="container">
      <h1 className="text-4xl font-bold">Welcome {data.me.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
    </>
  )
}
