import useTareas from "../hooks/useTareas";

const Tarea = ({task}) => {

    const { setEdicion, eliminarTarea } = useTareas()

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
            
            <p className="my-2">Responsable: <span className="font-bold normal-case text-black">{task.responsable}</span></p>

            <div className="flex justify-between my-5">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold  rounded-lg"
                    onClick={() => setEdicion(task)}
                >Editar</button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold  rounded-lg"
                    onClick={() => eliminarTarea(task._id)}
                >Eliminar</button>
          </div>

        </div>
    );

};

export default Tarea;