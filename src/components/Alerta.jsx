const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r p-2 rounded-xl uppercase text-white font-bold text-sm mb-10 text-center`}>
            {alerta.msg}
        </div>
    )
};

export default Alerta;