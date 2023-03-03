import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import useTareas from '../hooks/useTareas'

const Formulario = () => {
  const [tarea, setTarea] = useState('')
  const [responsable, setResponsable] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({})

  const { guardarTarea, task } = useTareas()

  useEffect (() => {
    if(task?.tarea){
      setTarea(task.tarea)
      setResponsable(task.responsable)
      setFecha(task.fecha)
      setId(task._id)

    }

  }, [task])

  const handleSubmit = e => {
    e.preventDefault()

    // validar el formulario
    if([tarea, responsable, fecha].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    guardarTarea({ tarea, responsable, fecha, id })
    setAlerta({
      msg: 'Guardado Correctamente'
    })

    setTarea('')
    setResponsable('')
    setFecha('')
    setId('')

  }

  const { msg } = alerta
  return (
    <>
      <div className="sticky top-0 w-full transform translate-y-0 transition-all duration-300 ease-in-out">
        <h2 className="font-black text-3xl text-center">Asignar una Tarea</h2>
        <p className="text-lg text-center mb-10">
          Crea una <span className="text-indigo-600 font-bold ">Nueva Tarea</span>
        </p>
        
        {msg && <Alerta alerta={alerta} />}

        <form 
          className="bg-white py-10 px-5 mb-10 lg:mb-8 shadow-md rounded-md"
          onSubmit={handleSubmit}
        >

          <div className="mb-5">
            <label 
              htmlFor="responsable"
              className="text-grey-700 uppercase font-bold "
            >Asignar Tarea a:</label>
            <input
              id="responsable"
              type="text"
              placeholder="Ejemplo: javier@correo.com"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={responsable}
              onChange={ e => setResponsable(e.target.value)}
            />
          </div>
          
          <div className="mb-5">
            <label 
              htmlFor="tarea"
              className="text-grey-700 uppercase font-bold "
            >Definir Tarea:</label>
            <textarea
              id="tarea"
              placeholder="Ejemplo: Realizar frontend de la app..."
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={tarea} 
              onChange={ e => setTarea(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label 
              htmlFor="fecha"
              className="text-grey-700 uppercase font-bold "
            >Fecha de entrega:</label>
            <input
              id="fecha"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={ e => setFecha(e.target.value)}
            />
          </div>

          <input 
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-xl" 
            value={ id ? 'Guardar Cambios': "Crear Tarea"}
          />
        </form>
      </div>
    </>
  )
}

export default Formulario