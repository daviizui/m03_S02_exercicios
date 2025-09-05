import { Routes, Route } from "react-router-dom";

import EnvioForm from "./pages/Envios/EnvioForm/EnvioForm";
import EnvioList from "./pages/Envios/EnviosList/EnviosList";
import TelaListagem from "./pages/TelaListagem/TelaListagem";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" Component={EnvioList} />
      <Route path="/envios/novo" Component={EnvioForm} />
      <Route path="/envios/editar/:id" Component={EnvioForm} />
      <Route path="/produtos/listagem" Component={TelaListagem} />
    </Routes>
  );
}


export default App;
