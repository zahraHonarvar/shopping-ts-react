import React, { useContext, useEffect, useRef, useState } from "react";
import banner from "../../banner.jpg";
import { addCart, selectItem } from "../../stateManager/actionCreator";

import { Link } from "react-router-dom";
import { AppContext, DispatchContext } from "../../App";

interface ItemModel {
  id: string;
  counts: number;
  title: string;
  price: number;
}
function List() {
  const [keyword, setKeyword] = useState("");

  const { cart, products } = useContext(AppContext) as any;
  const searchInput = useRef(null) as any;
  const dispatch = useContext(DispatchContext) as any;
  const filteredItems = products.filter((item: any) => {
    return item.title.toLowerCase().includes(keyword.toLowerCase());
  });

  useEffect(() => {
    searchInput.current.focus();
  }, []);
  function handleChange(e: any) {
    setKeyword(e.target.value);
  }
  function handleAddToCart(item: ItemModel) {
    console.log(item, cart);
    dispatch(addCart(item));
  }
  return (
    <>
      <div
        style={{ backgroundImage: `url(${banner})` }}
        className="parallax"
      ></div>
      <div className="search">
        <input
          ref={searchInput}
          className="form-control"
          type="search"
          placeholder="Search"
          value={keyword}
          onChange={handleChange}
        />
      </div>

      <div className="container">
        <div className="row">
          {filteredItems.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <div className="col-md-6">
                  <div className="list-item">
                    <div className="row">
                      <div className="col-md-12">
                        <h5>
                          <i className="fa fa-crosshairs"></i>
                          {item.title}
                        </h5>{" "}
                      </div>

                      <div className="col-md-5">
                        <Link to={`/Details/${item.id}`}>
                          <div
                            onClick={() => {
                              dispatch(selectItem(item.id));
                            }}
                          >
                            <img
                              alt={item.title}
                              className="img-fluid"
                              src={process.env.PUBLIC_URL + `${item.image}`}
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="col-md-7">
                        <h6>
                          <span>price:</span>
                          {item.price}$
                        </h6>
                        <p className="desc">{item.desc}</p>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleAddToCart(item)}
                        >
                          add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default List;
