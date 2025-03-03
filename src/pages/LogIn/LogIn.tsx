import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { toast } from "react-toastify";
type TFormData = {
  email: string;
  password: string;
};
 function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();


  const data:TFormData = {
email,
password
  }

  try {
    const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",data)
    console.log("data after", data);
    setEmail('');
    setPassword('');
    
    setErrors([]);
    toast.success(res.data.message);
    console.log(res);
  }
  catch (error) {
    console.log(error)
  }
}
  return (
    <div className={styles.formWrapper}>
    <h2>Log In</h2>
    <form onSubmit={handleSubmit}>
    {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li key={error} className="text-red-800 text-center my-2">{error}</li>
            ))}
          </ul>
        )}
      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error} className="text-red-800 text-center my-2">{error}</li>
          ))}
        </ul>
      )}
    

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      
     
      <button type="submit" className={styles.button}>
        Register
      </button>
    </form>
  </div>
  )
}

export default LogIn
