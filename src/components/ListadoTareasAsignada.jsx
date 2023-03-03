import useTareas from "../hooks/useTareas"
import TareaAsignada from "./TareaAsignada";


const ListadoTareasAsignada = () => {

  const { tareasAsignadas } = useTareas()

  return (
    <>
      { tareasAsignadas.length ? 
      (
        <>

          <h2 className="font-black text-3xl text-center">Lista de Tareas Asignadas</h2>
          
          <p className="text-lg text-center mb-10">
            Completa a tiempo <span className="text-indigo-600 font-bold">Todas tus Tareas</span>
          </p>

          {tareasAsignadas.map( task => (
            <TareaAsignada
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
  
export default ListadoTareasAsignada