import Modal from "./UI/Modal";
import CartContext from "../store/CartContext.jsx";
import { use } from "react";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Cart() {
    const cartCtx  = use(CartContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const userProgressCtx = use(UserProgressContext);



    return <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) => (
                <li key={item.id}>
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                </li>
            ))}
        </ul>
        <p className='cart-total'>Total: {currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={() => userProgressCtx.hideCart()}>
                Close
            </Button>
            <Button onClick={() => userProgressCtx.showCheckout()}>Checkout</Button>
        </p>
    </Modal>
}