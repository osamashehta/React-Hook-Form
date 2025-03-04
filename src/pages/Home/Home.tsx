import { Link } from "react-router-dom"

function Home() {
  const name = localStorage.getItem('name')
  return (
    <>
      <div className="flex justify-center items-center space-x-12 mt-12 h-[50vh] ">
     <p className="text-3xl rounded-xl bg-slate-200 p-4"> Welcom Home {name}</p>
     

    </div>
    <div className="flex gap-12 justify-center">
    <Link to="/login" className="text-3xl text-blue-600 ">Login</Link>
    <Link to="/register" className="text-3xl text-blue-600 ">Register</Link>
    </div>
    </>
  )
}

export default Home