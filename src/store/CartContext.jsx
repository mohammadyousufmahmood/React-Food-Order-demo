import { Children, createContext } from "react";
import { useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
});

const cartReducer = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.item.id,
  );

  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE-ITEM") {
    const existingItem = state.items[existingItemIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.slice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  return state;
};

export function CartContextProvider({ children }) {
  const [cart, cartAction] = useReducer(cartReducer, { items: [] });

  const addItem = item => cartAction({ type: 'ADD_ITEM', item }) 
  const removeItem =  item => cartAction({ type: 'REMOVE_ITEM', item })

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem
  }

  console.log(cartContext)
  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
