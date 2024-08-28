import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Shipping = () => {

  const navigate = useNavigate()  

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  })  
  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo(prev=>({...prev,[e.target.name]: e.target.value}))
  };

  return (
    <div className="shipping">
        <button className="back-btn" onClick={() => navigate("/cart")}><BiArrowBack /></button>
        <form action="">
            <h1>Shipping Address</h1>
            <input type="text" placeholder="Address" name="address" required value={shippingInfo.address} onChange={changeHandler}/>
            <input type="text" placeholder="City" name="city" required value={shippingInfo.city} onChange={changeHandler}/>
            <input type="text" placeholder="State" name="state" required value={shippingInfo.state} onChange={changeHandler}/>
            <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                <option value="">Select</option>
                <option value="india">India</option>
                <option value="pakistan">Pakistan</option>
                <option value="nepal">Nepal</option>
            </select>
            <input type="text" placeholder="Pin Code" name="pinCode" required value={shippingInfo.pinCode} onChange={changeHandler}/>
            <button type="submit">Pay Now</button>

        </form>
    </div>
  )
}

export default Shipping;