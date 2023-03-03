import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios'

const TareasContext = createContext()

export const TareasProvider = ({children}) => {

    const [tareas, setTareas] = useState([])
    const [tareasAsignadas, setTareasAsignadas] = useState([])
    const [task, setTask] = useState([])

    useEffect(() => {
        const obtenerTareas = async () => {

            try {
                const token = localStorage.getItem('token')
                if (!token) return
                
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/task', config)
                setTareas(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerTareas()
    }, [])

    useEffect(() => {
        const obtenerTareasAsignadas = async () => {

            try {
                const token = localStorage.getItem('token')
                if (!token) return
                
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const { data } = await clienteAxios('/task/user', config)
                setTareasAsignadas(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerTareasAsignadas()
    }, [])

    const guardarTarea = async (task) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        if(task.id) {
            
            try {
                const { data } = await clienteAxios.put(`/task/${task.id}`, task, config)

                const  tareaActualizada = tareas.map( tareaState => tareaState._id === data._id ? data : tareaState )

                setTareas(tareaActualizada)
            } catch (error) {
                console.log(error);
            }

        } else {
            try {

                const { data } = await clienteAxios.post('/task', task, config)
                const { createdAt, updatedAt, __v, ...tareaAlmacenada } = data
                setTareas([tareaAlmacenada, ...tareas])
                

            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const setEdicion = (task) => {
        setTask(task)
    }

    const eliminarTarea = async id => {
        const confirmar = confirm('¿Seguro que deseas eliminar esta tarea?')

        if(confirmar) {
            try {
                
                const token = localStorage.getItem('token')
                if (!token) return
                
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/task/${id}`, config)
                
                const tareasActualizada = tareas.filter( tareasState => tareasState._id !== id)

                setTareas(tareasActualizada);

            } catch (error) {
                console.log(error);
            }

        }
    }

    const cambiarEstadoTarea = async id => {
        
        const token = localStorage.getItem('token')
        if (!token) return
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {

            const { data } = await clienteAxios.put(`/task/user/${id}`, task, config)
            const  tareaActualizada = tareasAsignadas.map( tareaState => tareaState._id === data._id ? data : tareaState )

            setTareasAsignadas(tareaActualizada);

        } catch (error) {
            console.log(error);
        }

    }
    
    return(
        <TareasContext.Provider
            value={{
                tareas,
                tareasAsignadas,
                guardarTarea,
                setEdicion,
                task,
                eliminarTarea,
                cambiarEstadoTarea
            }}
        >
            {children}
        </TareasContext.Provider>
    )
}


export default TareasContext;