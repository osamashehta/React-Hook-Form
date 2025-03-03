import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";

type TFormData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: TFormData = {
      name,
      email,
      password,
      rePassword,
      phone,
    };
    console.log("data before", data);
    if(password !== rePassword){
      setErrors(["Password and Confirm Password should be the same"]);
      return;
    }
    
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data
      );
      console.log("data after", data);
      setName('');
      setEmail('');
      setPassword('');
      setRePassword('');
      setPhone('');
      setErrors([]);
      console.log(res);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li key={error} className="text-red-800 text-center my-2">{error}</li>
            ))}
          </ul>
        )}
        <label htmlFor="name">User Name</label>
        <input
          onChange={(e) => setName(  e.target.value )}
          id="name"
          type="text"
          placeholder="Username"
          value={name}
        />

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

        <label htmlFor="rePassword">Confirm Password</label>
        <input
          id="rePassword"
          type="password"
          placeholder="Confirm Password"
          onChange={(e)=> setRePassword(e.target.value)}
          value={rePassword}
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="Phone"
         onChange={(e)=> setPhone(e.target.value)}
          value={phone}
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
