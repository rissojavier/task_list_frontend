import useTareas from "../hooks/useTareas";

const TareaAsignada = ({task}) => {

    const { cambiarEstadoTarea } = useTareas()

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        const opciones = {weekday: 'long', day: 'numeric', month: 'long'};
        return new Intl.DateTimeFormat('es-MX', opciones).format(nuevaFecha)
    }

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            {task.completado ? 
            (
                <>
                    <p className="font-bold normal-case text-emerald-500">Tarea Finalizada:</p>
                </>
            ):
            (
                <>
                    <p className="font-bold normal-case text-rose-500">Tarea Pendiente:</p>
                </>
            )}
           
            <p className="font-bold normal-case text-black my-2">{task.tarea}</p>
            
            <p className="font-normal my-2">Entrega: <span className="font-bold normal-case text-black">{formatearFecha(task.fecha)}</span></p>

            <div className="flex justify-center mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold  rounded-lg text-xs"
                    onClick={() => cambiarEstadoTarea(task._id)}
                >{task.completado ? 'Marcar como Pendiente' : 'Marcar como Completado'}</button>
                
          </div>

        </div>
    );

};

export default TareaAsignada;