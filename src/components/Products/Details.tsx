import React, { useContext } from "react";
import { addCart } from "../../stateManager/actionCreator";
import { AppContext, DispatchContext } from "../../App";
import { useParams } from "react-router";
import { isTemplateExpression } from "typescript";
interface ItemModel {
  id: string;
  counts: number;
  title: string;
  price: number;
}
interface ParamType {
  productId: string;
}
function Details() {
  const { products } = useContext(AppContext) as any;
  const { productId } = useParams<ParamType>();
  const dispatch = useContext(DispatchContext) as any;

  function addToCart(item: ItemModel) {
    dispatch(addCart(item));
  }

  const selectedMyItem = products.find((item: any) => item.id === productId);
  return (
    <>
      <div className="container details">
        <div className="row">
          <div className="col-md-6">
            <img
              alt={selectedMyItem.title}
              className="img-fluid"
              src={process.env.PUBLIC_URL + `${selectedMyItem.image}`}
            />
          </div>
          <div className="col-md-6">
            <h4>
              {" "}
              <i className="fa fa-crosshairs"></i>
              {selectedMyItem.title}
            </h4>
            <p>
              <span>Price :</span>
              {selectedMyItem.price}$
            </p>
            <p>
              <span>Description :</span>
              {selectedMyItem.desc}
            </p>

            <button
              onClick={() => addToCart(selectedMyItem)}
              className="btn btn-danger"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
