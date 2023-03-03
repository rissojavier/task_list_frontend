import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
    const [ email, setEmail ] = useState("");
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === "" || email.length < 5) {
            setAlerta({msg: "El email es obligatorio", error: true});
            return;
        }

        try {
            
            const { data } = await clienteAxios.post('/lideres/olvide-password', { email });
            console.log(data);
            setAlerta({msg: data.msg})
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
                <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Password <span className="text-black">& Accede a tus Tareas</span></h1>
            </div>

            <div className="mt-20 md:mt-3 shadow-lg px-5 py-10 rounded-xl">

                { msg && <Alerta alerta={alerta} />}

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-black block text-xl font-bold">Email</label>
                        <input 
                            type="email" 
                            placeholder="correo@correo.com"
                            className="border h-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Enviar Instrucciones"
                        className="bg-indigo-600 w-full py-3 px-6 text-white rounded-xl uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>
                
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/registrar" className="block text-center my-5 text-gray-500">¿Quieres completar las tareas? Registrate</Link>
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes cuenta? Inicia Sesión</Link>
                </nav>
            </div>
        </>
    );
};

export default OlvidePassword;