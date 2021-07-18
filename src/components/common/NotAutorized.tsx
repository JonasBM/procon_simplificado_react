import React from "react";
import { Link } from "react-router-dom";

const NotAutorized = () => {
  return (
    <div className="text-center mt-4">
      <h1>403 - Sem autorização para acessar esta pagina!</h1>
      <Link to="/">Ir para pagina inicial</Link>
      <Link to="/logout">Logar com outra conta</Link>
    </div>
  );
};

export default NotAutorized;
