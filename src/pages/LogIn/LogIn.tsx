import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
type TFormData = {
  email: string;
  password: string;
};
function LogIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const UserSchema: ZodType<TFormData> = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {
        message: "Enter a valid email",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

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
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        data
      );

      if (res.data.message === "success") {
        toast.success(res.data.message);
        localStorage.setItem("name", res.data.user.name);
        navigate("/");
      }
      reset();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit(sendData)}>
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

        <button type="submit" className={styles.button}>
          {loading ? <BeatLoader color="#39e228" size={10} /> : "LogIn"}
        </button>
      </form>
      <Link to="/register" className={styles.link}>
        You don't have an account
      </Link>
    </div>
  );
}

export default LogIn;
