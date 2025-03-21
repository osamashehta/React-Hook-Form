import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TFormData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
const UserSchema: ZodType<TFormData> = z
  .object({
    name: z
      .string()
      .min(5, { message: "Username must be at least 5 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {
        message: "Enter a valid email",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    rePassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    phone: z
      .string()
      .regex(/^(01[0-2,5])[0-9]{8}$/, { message: "Enter Egyptian number" }),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "The passwords do not match",
    path: ["rePassword"],
  });
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>({
    resolver: zodResolver(UserSchema),
    mode: "onBlur",
  });

  const sendData = async (data: TFormData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data
      );
      if (res.data.message === "success") {
        toast.success(res.data.message);
        navigate("/");
      }
      reset();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit(sendData)}>
        <label htmlFor="name">User Name</label>
        <input
          id="name"
          type="text"
          placeholder="Username"
          {...register("name")}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />

        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <label htmlFor="rePassword">Confirm Password</label>
        <input
          id="rePassword"
          type="password"
          placeholder="Confirm Password"
          {...register("rePassword")}
        />
        {errors.rePassword && (
          <p className={styles.error}>{errors.rePassword.message}</p>
        )}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="Phone"
          {...register("phone")}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <button type="submit" className={styles.button}>
          {loading ? <BeatLoader color="#39e228" size={10} /> : "Register"}
        </button>
      </form>
      <Link to="/" className={styles.link}>
        You have an account
      </Link>
    </div>
  );
}

export default Register;
