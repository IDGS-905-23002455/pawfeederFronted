import { Route, Routes } from 'react-router-dom'

import Layout from './componentes/Layout.jsx'
import { GuardRol } from './componentes/GuardRol.jsx'
import Home from './paginas/Home.jsx'
import About from './paginas/About.jsx'
import Contacto from './paginas/Contacto.jsx'
import Manual from './paginas/Manual.jsx'
import Faq from './paginas/Faq.jsx'
import Reviews from './paginas/Reviews.jsx'
import Login from './paginas/Login.jsx'
import Registro from './paginas/Registro.jsx'
import Admin from './paginas/Admin.jsx'
import DashboardAdmin from './paginas/DashboardAdmin.jsx'
import DashboardCliente from './paginas/DashboardCliente.jsx'
import Perfil from './paginas/Perfil.jsx'
import Mascotas from './paginas/Mascotas.jsx'
import Horarios from './paginas/Horarios.jsx'
import MisCompras from './paginas/MisCompras.jsx'
import ComentariosAdmin from './paginas/ComentariosAdmin.jsx'
import Inventario from './paginas/Inventario.jsx'
import InventarioDispensadores from './paginas/InventarioDispensadores.jsx'
import Proveedores from './paginas/Proveedores.jsx'
import Recetas from './paginas/Recetas.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="manual" element={<Manual />} />
        <Route path="preguntas-frecuentes" element={<Faq />} />
        <Route path="opiniones" element={<Reviews />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />

        <Route element={<GuardRol rol="admin" />}>
          <Route path="admin" element={<Admin />} />
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="comentarios" element={<ComentariosAdmin />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="inventario-dispensadores" element={<InventarioDispensadores />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="recetas" element={<Recetas />} />
        </Route>

        <Route element={<GuardRol rol="cliente" />}>
          <Route path="mascotas" element={<Mascotas />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="horarios" element={<Horarios />} />
          <Route path="mis-compras" element={<MisCompras />} />
          <Route path="dashboard-cliente" element={<DashboardCliente />} />
        </Route>

        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}