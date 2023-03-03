import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import Registrar from './paginas/Registrar';
import RegistrarLider from './paginas/RegistrarLider';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import Login from './paginas/Login';
import AdministrarTasksAdmin from './paginas/AdministrarTasksAdmin';
import TasksAsignadas from './paginas/TasksAsignadas';

import { AuthProvider } from './context/AuthProvider';
import { TareasProvider } from './context/TareasProvider'

function App() {

  return (
    <BrowserRouter>
      <TareasProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={< AuthLayout />}>
              <Route index element={< Login />} />
              <Route path="registrar" element={< Registrar />} />
              <Route path="registrar-lider" element={< RegistrarLider />} />
              <Route path="confirmar/:id" element={< ConfirmarCuenta />} />
              <Route path="olvide-password" element={< OlvidePassword />} />
              <Route path="olvide-password/:token" element={< NuevoPassword />} />
            </Route>
            
            <Route path="/admin" element={< RutaProtegida />}>
              <Route index element={< AdministrarTasksAdmin/>} />
            </Route>
            
            <Route path="/user" element={< RutaProtegida />}>
              <Route index element={< TasksAsignadas/>} />
            </Route>

          </Routes>
        </AuthProvider>
      </TareasProvider>
    </BrowserRouter>
  );
};

export default App;
