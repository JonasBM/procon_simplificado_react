import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store";

import { positions, Provider as AlertProvider } from "react-alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminRoute from "./components/common/AdminRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import NotFound from "./components/common/NotFound";
import Login from "./components/accounts/Login";
import Logout from "./components/accounts/Logout";
import Perfil from "./components/accounts/Perfil";
import Processos from "./components/processos";
// import Admin from "./components/Admin";

import Loading from "./components/common/Loading";

import "./loadInterceptor";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

import Alerts from "./components/layouts/alerts/Alerts";
import AlertTemplate from "./components/layouts/alerts/AlertTemplate";
import NotAutorized from "./components/common/NotAutorized";

function App() {
  const alertOptions = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    containerStyle: {
      zIndex: 1070,
    },
  };

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Alerts />
          <Header />
          <main role="main">
            <Switch>
              <Route exact path="/" component={Fragment} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/perfil" component={Perfil} />
              <PrivateRoute exact path="/processos" component={Processos} />
              <AdminRoute exact path="/admin" component={Fragment} />
              <Route exact path="/loading" component={Loading} />
              <Route exact path="/NotAutorized" component={NotAutorized} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
