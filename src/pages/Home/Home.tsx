import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="flex justify-center space-x-12 mt-12">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Home