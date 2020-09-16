import React, { useReducer, useState, createContext, useEffect } from "react";

import "./App.css";
import List from "./components/Products/List";
import logo from "./zlogo.png";

import ReactDom from "react-dom";
import { INIT_STATE, reducer } from "./stateManager/reducer";
import Details from "./components/Products/Details";
import Loading from "./components/Loading/index";
import Cart from "./components/cart";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getInitData } from "../src/stateManager/actionCreator";
import Layout from "./Layout";

import AboutUs from "./components/Pages/aboutUS";
import ContactUs from "./components/Pages/contactUs";
import { getData } from "./server/index";

export const AppContext = createContext({});
export const DispatchContext = createContext({});

function App() {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function handleShowCart() {
    setShow(!show);
  }
  useEffect(() => {
    getData().then((res) => {
      dispatch(getInitData(res));
    });
  }, []);
  return (
    <div>
      <DispatchContext.Provider value={dispatch}>
        <AppContext.Provider value={state}>
          <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light special-nav">
              <a className="navbar-brand" href="#">
                <img src={logo} style={{ width: "130px" }} />
              </a>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutus">
                    aboutus
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contactus">
                    Contactus
                  </Link>
                </li>
              </ul>

              <button className="shop" onClick={handleShowCart}>
                <i className="fa fa-shopping-basket"></i>
              </button>
            </nav>

            <Layout>
              <Switch>
                <Route path="/" exact>
                  {!state.loading ? <List /> : <Loading />}
                </Route>
                <Route path={`/Details/:productId`}>
                  {!state.loading ? <Details /> : <Loading />}
                </Route>
                <Route path="/aboutUs">
                  <AboutUs />
                </Route>
                <Route path="/ContactUs">
                  <ContactUs />
                </Route>
              </Switch>
            </Layout>
          </Router>

          {show && ReactDom.createPortal(<Cart />, document.body)}
        </AppContext.Provider>
      </DispatchContext.Provider>
    </div>
  );
}

export default App;
