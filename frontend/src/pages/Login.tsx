
export default function Login({setToken}: {setToken: (token: string) => void}) {
  return (
    <div>
      Login
      <button onClick={() => setToken('token')}>Login</button>
    </div>
  )
}
