import { useEffect, useState } from "react";
import {VscError} from 'react-icons/vsc';
import CartItem from "../components/cartItem";
import { Link } from "react-router-dom";
const cartItems = [
{
    productId: "adasda",
    photo: "https://www.snitch.co.in/cdn/shop/files/6474a298d8217c03f5e45a1717f31f0b.webp?v=1723198378&width=1080",
    name: "Double Pocket Light Blue Overshirt",
    price: 1545,
    quantity: 4,
    stock: 10,
},
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges;

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

    useEffect(() => {
        const timeOutID = setTimeout(() => {
            if(Math.random()>0.5){
                setIsValidCouponCode(true);
            }else{
                setIsValidCouponCode(false);
            }
        }, 1000);
        return () => {
            clearTimeout(timeOutID)
            setIsValidCouponCode(false);
        }
    }, [couponCode])


  return (
    <div className="cart">
        <main>
            {
                cartItems.length > 0 
                ? cartItems.map((i, idx)=> (<CartItem key={idx} cartItem={i}/>))
                : <h1>No Items Added</h1>
            }
        </main>
        <aside>
            <p>Subtotal: ${subtotal}</p>
            <p>Shipping: ${shippingCharges}</p>
            <p>Tax: ${tax}</p>
            <p>
                Discount: <em className="red"> - ${discount}</em>
            </p>
            <p><b>Total: ${total}</b></p>

            <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
        {couponCode && 
        (isValidCouponCode ? (
                <span className="green">
                    ${discount} off using the <code>{couponCode}</code>
                </span>
            ) : (
                <span className="red">Invalid Coupan <VscError /></span>
            ))}


            {
                cartItems.length > 0 && <Link to="/Shipping">Checkout</Link>
            }
        </aside>
    </div>
  )
}

export default Cart