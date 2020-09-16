import React, { useContext } from "react";
import { AppContext, DispatchContext } from "../App";
import {
  handleIncrease,
  handleDecrease,
  removeCart,
  deleteCartItem,
} from "../stateManager/actionCreator";
interface ItemsModel {
  id: string;
  counts: number;
  title: string;
  price: number;
}
function Cart() {
  const { cart, totalPrice } = useContext(AppContext) as any;
  const dispatch = useContext(DispatchContext) as any;

  function increaseCount(item: ItemsModel) {
    dispatch(handleIncrease(item));
  }

  function decreseCount(item: ItemsModel) {
    dispatch(handleDecrease(item));
  }

  function removeCartItem() {
    dispatch(removeCart());
  }

  function handleDeleteCartItem(item: any) {
    dispatch(deleteCartItem(item));
    console.log(item);
  }

  return (
    <div className="cart">
      <ul>
        {cart.length > 0 ? (
          cart.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.counts > 0 && (
                  <li>
                    <div className="row">
                      <div className="col-6  pright-0">
                        {item.title}
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteCartItem(item)}
                        >
                          X
                        </button>
                      </div>
                      <div className="col-6 pleft-0 ">
                        <img
                          alt={item.title}
                          className="img-fluid"
                          src={process.env.PUBLIC_URL + `${item.image}`}
                        />
                      </div>
                    </div>

                    <p>price:{item.price * item.counts}$</p>

                    <button
                      className="btn btn-success"
                      onClick={() => increaseCount(item)}
                    >
                      +
                    </button>
                    <span className="span-count"> {item.counts}</span>
                    <button
                      className="btn btn-danger"
                      onClick={() => decreseCount(item)}
                    >
                      -
                    </button>
                  </li>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <h3 className="empty">cart is empty</h3>
        )}
      </ul>
      <button
        disabled={cart.length === 0}
        className="btn btn-danger btn-remove"
        onClick={removeCartItem}
      >
        clear cart
      </button>
      <p>total Price:{totalPrice.toFixed(2)}$</p>
    </div>
  );
}

export default Cart;
