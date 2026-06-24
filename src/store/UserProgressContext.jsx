import { createContext } from "react";
import { useState } from "react";

const UserProgressContext = createContext({
    progress: '',  // this should be cart or checkout
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
    });

export function UserProgressContextProvider({ children }) {
    const [progress, setProgress] = useState('');

    const showCart = () => setProgress('cart');
    const hideCart = () => setProgress('');
    const showCheckout = () => setProgress('checkout');
    const hideCheckout = () => setProgress('');


    const userProgressContext = {
        progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgressContext.Provider value={userProgressContext}>
        {children}
    </UserProgressContext.Provider>
}

export default UserProgressContext;