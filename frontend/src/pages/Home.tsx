
export default function Home({logout}: {logout: () => void}) {
  return (
    <div>
        Home
        <button onClick={logout}>Logout</button>
    </div>
  )
}
