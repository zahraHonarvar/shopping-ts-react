import { ACTIONS } from "./actionCreator";

interface StateModel {
  products: Array<object>;
  cart: Array<object>;
  totalPrice: number;
  selectedItem: any;
  showCart: boolean;
  loading: boolean;
}
export const INIT_STATE: StateModel = {
  products: null,
  cart: [],
  totalPrice: 0,
  selectedItem: null,
  showCart: false,
  loading: true,
};

export function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTIONS.GET_INIT_DATA: {
      const addedData = action.payload.map((item: any) => {
        return {
          id: item.sys.id,
          counts: item.sys.counts,
          title: item.fields.title,
          price: item.fields.price,
          image: item.fields.image,
          desc: item.fields.desc,
        };
      });

      return {
        ...state,
        products: addedData,
        loading: false,
      };
    }
    //go to detials
    case ACTIONS.SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: action.payload,
      };
    }
    //add product to cart
    case ACTIONS.ADD_TO_CART: {
      const item = [...state.products].find((item) => item === action.payload);
      const itemIndex = [...state.cart].findIndex((x) => x.id === item.id);

      if (itemIndex === -1) {
        return {
          ...state,
          cart: [...state.cart, item],
          totalPrice: state.totalPrice + item.price,
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart.slice(0, itemIndex),
            {
              ...state.cart[itemIndex],
              counts: state.cart[itemIndex].counts++,
            },
            ...state.cart.slice(itemIndex + 1),
          ],
          totalPrice: state.totalPrice + item.price,
        };
      }
    }

    // increase count of cart item
    case ACTIONS.ADD_COUNT: {
      const itemIndex = state.cart.findIndex(
        (item: any) => item.id === action.payload.id
      );

      return {
        ...state,
        cart: [
          ...state.cart.slice(0, itemIndex),
          {
            ...state.cart[itemIndex],
            counts: state.cart[itemIndex].counts++,
          },
          ...state.cart.slice(itemIndex + 1),
        ],
        totalPrice: state.totalPrice + state.cart[itemIndex].price,
      };
    }
    // decrese count of cart item
    case ACTIONS.REMOVE_COUNT: {
      const itemIndex = state.cart.findIndex(
        (item: any) => item.id === action.payload.id
      );

      return {
        ...state,
        cart: [
          ...state.cart.slice(0, itemIndex),
          {
            ...state.cart[itemIndex],
            counts: state.cart[itemIndex].counts--,
          },
          ...state.cart.slice(itemIndex + 1),
        ],
        totalPrice: state.totalPrice - state.cart[itemIndex].price,
      };
    }

    // delete one cart item
    // only this time counts of selected cart dont update
    case ACTIONS.DELETE_CART_ITEM: {
      const removedITem = state.cart.find(
        (item: any) => item === action.payload
      );
      console.log(removedITem);

      return {
        ...state,
        cart: state.cart.filter((item) => item !== removedITem),
        totalPrice: state.totalPrice - removedITem.counts * removedITem.price,
      };
    }
    // remove all cart items

    case ACTIONS.REMOVE_CART: {
      return {
        ...state,
        cart: [],
        totalPrice: 0,
      };
    }
    default:
      return state;
  }
}
