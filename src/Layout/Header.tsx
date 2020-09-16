import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../zlogo.png";
interface HeaderType {
  keyword: string;
  handleChange: () => void;
  handleShowCart: () => void;
}
function Header({ keyword, handleChange, handleShowCart }: HeaderType) {
  return (
    <>
      <nav className="navbar navbar-light bg-light special-nav">
        <img src={logo} style={{ width: "130px" }} />

        <form className="form-inline">
          <input
            style={{ width: "500px" }}
            className="form-control mr-sm-6"
            type="search"
            placeholder="Search"
            value={keyword}
            onChange={handleChange}
          />
        </form>
        <button className="shop" onClick={handleShowCart}>
          <i className="fa fa-shopping-basket"></i>
        </button>
      </nav>
    </>
  );
}

export default Header;
