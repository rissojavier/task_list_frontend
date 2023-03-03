import { useState } from 'react';
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Registrar = () => {
    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    
    const [alerta, setAlerta] = useState({}); 

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword, telefono].includes('')){
            setAlerta({ msg: 'Hay campos vacios', error: true});
            return;
        }

        if( password !== repetirPassword) {
            setAlerta({ msg: 'Los Password no son iguales', error: true});
            return;
        }

        if(password.length < 6) {
            setAlerta({ msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true});
            return;
        }

        setAlerta({});

        // Crear usuario en la api
        try {
            await clienteAxios.post("/lideres", { nombre, email, password, telefono });
            setAlerta({
                msg: "Creado Correctamente, revisa tu email",
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }

    };

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Registrate como Usuario <span className="text-black">& Completa tus Tareas</span></h1>
            </div>

            <div className="mt-20 md:mt-3 shadow-lg px-5 py-10 rounded-xl">

                { msg && <Alerta alerta={alerta}/>}

                <div className="flex justify-between my-5 ">
                    <input 
                        type="button"
                        value="Registrate como Usuario"
                        className="w-full py-3 px-6 bg-slate-200 rounded-l-xl font-black mt-5"
                    />
                    <Link to="/registrar-lider">
                    <input  
                        type="button"
                        value="Registrate como Lider"
                        className="bg-slate-900 w-full transition-transform py-3 px-6 text-white rounded-r-xl font-bold mt-5 hover:cursor-pointer hover:bg-indigo-600"
                        />
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="my-5">
                        <label className="uppercase text-black block text-xl font-bold">Nombre</label>
                        <input 
                            type="text" 
                            placeholder="Tu nombre"
                            className="border h-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={nombre}
                            onChange={ e => setNombre(e.target.value)} 
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-black block text-xl font-bold">Email</label>
                        <input 
                            type="email" 
                            placeholder="correo@correo.com"
                            className="border h-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={email}
                            onChange={ e => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-black block text-xl font-bold">Password</label>
                        <input 
                            type="password" 
                            placeholder="Tu Password"
                            className="border h-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-black block text-xl font-bold">Repetir Password</label>
                        <input 
                            type="password" 
                            placeholder="Repitir Password"
                            className="border h-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={repetirPassword}
                            onChange={ e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="my-5">
                        <label className="uppercase text-black block text-xl font-bold">Telefono</label>
                        <input 
                            type="text" 
                            placeholder="0456 123 45 67"
                            className="border h-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={telefono}
                            onChange={ e => setTelefono(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Registrar"
                        className="bg-indigo-600 w-full py-3 px-6 text-white rounded-xl uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
                    />

                    <Link to="/" className="flex justify-center my-5 text-gray-500 mt-10 lg:flex lg:justify-center">¿Ya tienes cuenta? Inicia Sesión</Link>
                </form>

            </div>
        </>
    );
};

export default Registrar;