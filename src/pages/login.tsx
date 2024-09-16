import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/login', { // Correct URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }), // Ensure role is defined
            });
    
            const data = await response.json();
    
            if (response.ok) {
                
                console.log('Login successful', data);
                navigate('/admin/dashboard');
                // You can redirect or do further processing here
            } else {
                setErrorMessage(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };
    

  return (
    <div className="login">
        <main>
            <h1 className="heading">Login</h1>
            <div>
                <label>Email</label>
                <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
                <label>Role</label>
                <select name="" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Your Role</option>
                    <option value="0">User</option>
                    <option value="1">Seller</option>
                </select>
            </div>
            <div>
                <button type="submit" className="login button" name="password" id="password" onClick={handleLogin}>submit</button>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
            <div>
                <p>Already Signed In Once</p>
                <button><FcGoogle /><span>Sign in with Google</span></button>
            </div>
        </main>

    </div>
  )
}

export default Login
