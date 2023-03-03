import useTareas from "../hooks/useTareas"
import Tarea from "./Tarea";


const ListadoTareas = () => {

  const { tareas } = useTareas()

  return (
    <>
      { tareas.length ? 
      (
        <>

          <h2 className="font-black text-3xl text-center">Lista de Tareas</h2>
          
          <p className="text-lg text-center mb-10">
            Gestiona las <span className="text-indigo-600 font-bold">Tareas Asignadas</span>
          </p>

          {tareas.map( task => (
            <Tarea
              key={task._id}
              task={task}
            />
          ))}
        
        </>
      ) :
      (
        <>
          <h2 className="font-black text-3xl text-center">No hay Tareas</h2>
          
          <p className="text-xl mt-5 mb-10 text-center">
            Asigna nuevas tareas y <span className="text-indigo-600 font-bold">visualízalas aquí.</span>
          </p>
        </>
      )}
    </>

  )
}
  
export default ListadoTareas