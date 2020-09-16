export const ACTIONS = {
  SELECTED_ITEM: "SELECTED_ITEM",
  ADD_TO_CART: "ADD_TO_CART",
  ADD_TO_DETAILS_CART: "ADD_TO_DETAILS_CART",
  ADD_COUNT: "ADD_COUNT",
  REMOVE_COUNT: "REMOVE_COUNT",
  REMOVE_CART: "REMOVE_CART",
  DELETE_CART_ITEM: "DELETE_CART_ITEM",
  GET_INIT_DATA: "GET_INIT_DATA",
};
interface ItemModel {
  id: string;
  counts: number;
  title: string;
  price: number;
}
interface TypeAdd {
  type: string;
  payload: ItemModel;
}
interface SelectItem {
  type: string;
  payload: string;
}
interface ItemsModel {
  id: string;
  counts: number;
  title: string;
  price: number;
}
interface TypeRemove {
  type: string;
}
export function getInitData(data: any) {
  return {
    type: ACTIONS.GET_INIT_DATA,
    payload: data,
  };
}
export function selectItem(id: string): SelectItem {
  return {
    type: ACTIONS.SELECTED_ITEM,
    payload: id,
  };
}
export function addCart(item: ItemsModel): TypeAdd {
  return {
    type: ACTIONS.ADD_TO_CART,
    payload: item,
  };
}

export function handleIncrease(item: ItemsModel): TypeAdd {
  return {
    type: ACTIONS.ADD_COUNT,
    payload: item,
  };
}
export function handleDecrease(item: ItemsModel): TypeAdd {
  return {
    type: ACTIONS.REMOVE_COUNT,
    payload: item,
  };
}
export function removeCart(): TypeRemove {
  return {
    type: ACTIONS.REMOVE_CART,
  };
}
export function deleteCartItem(item: any) {
  return {
    type: ACTIONS.DELETE_CART_ITEM,
    payload: item,
  };
}
