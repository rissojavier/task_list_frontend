import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Header = () => {

    const { cerrarSesion } = useAuth()
  return (
    <header className="py-10 bg-indigo-600 items-center">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between">
        <h1 className="font-black text-5xl text-white text-center justify-center ">Task List <span className="text-indigo-200 font-normal">App</span></h1>

        <nav className="flex gap-4 flex-col lg:flex-row mt-5 lg:mt-8">
          <button
            type="button"
            className="text-indigo-200 text-sm font-bold uppercase"
            onClick={cerrarSesion}
          >Cerrar Sesión</button>
        </nav>
      </div>
    </header>
  )
}

export default Header