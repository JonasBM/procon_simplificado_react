import React, { FunctionComponent, ReactChild } from "react";
import { useAppSelector } from "../../hooks";
import { Route, NavLink } from "react-router-dom";

const NavItem: FunctionComponent<{
  to: string;
  children: ReactChild;
}> = ({ to, children }) => {
  return (
    <Route
      exact
      path={to}
      children={({ match }) => (
        <li className={match ? "nav-item active" : "nav-item"}>
          <NavLink
            activeClassName="active"
            className="nav-link"
            aria-current="page"
            to={to}
          >
            {children}
          </NavLink>
        </li>
      )}
    />
  );
};

const LoginButton = () => (
  <div className="btn-group mx-2" role="group">
    <NavLink to="/login" className="btn btn-outline-success">
      Entrar
    </NavLink>
  </div>
);

const LogoutButton = () => (
  <NavLink to="/logout" className="btn btn-outline-danger mx-2">
    Sair
  </NavLink>
);

const Header = () => {
  const auth = useAppSelector((state) => state.accounts.auth);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-1">
      <a className="navbar-brand ms-lg-4" href="/">
        <img
          className="d-inline-block align-middle"
          src={process.env.PUBLIC_URL + "/logoipsum-logo-8.svg"}
          alt=""
          height="50"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarContent">
          <span className="navbar-brand">
            {auth.user
              ? auth.user.first_name + " " + auth.user.last_name
              : "Procon Simplificado"}
          </span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavItem to="/perfil">Perfil</NavItem>
            <NavItem to="/processos">Processos</NavItem>
            {auth && auth.user && auth.user.is_staff && (
              <NavItem to="/admin">Administração</NavItem>
            )}
          </ul>
          {auth.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
