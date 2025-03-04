import styles from "./styles.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type TFormData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<TFormData>();

  const sendData = async (data: TFormData) => {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data
      );
      console.log("data after", data);

      console.log(res);
      if(res.data.message === "success"){

        toast.success("User registered successfully");
      }
      reset();
    } catch (error: any) {
      console.error("Error submitting form", error);
      toast.error(error.response?.data?.message);
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
          {...register("name", {
            required: "This field is required",
            minLength: {
              value: 5,
              message: "Username must be at least 5 characters",
            },
          })}
        />
        {errors.name && errors.name.type === "required" && (
          <p className={styles.error}>{errors.name.message}</p>
        )}
        {errors.name && errors.name.type === "minLength" && (
          <p className={styles.error}>{errors.name.message}</p>
        )}


        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />

{errors.email && errors.email.type === "required" && (
          <p className={styles.error}>{errors.email.message}</p>
        )}

        {errors.email && errors.email.type === "pattern" && (
          <p className={styles.error}>{errors.email.message}</p>
        ) }


        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <label htmlFor="rePassword">Confirm Password</label>
        <input
          id="rePassword"
          type="password"
          placeholder="Confirm Password"
          {...register("rePassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
        />
        {errors.rePassword && errors.rePassword.type === "required" && (
          <p className={styles.error}>{errors.rePassword.message}</p>
        )}
        {errors.rePassword && errors.rePassword.type === "validate" && (
          <p className={styles.error}>{errors.rePassword.message}</p>
        )}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="Phone"
          {...register("phone", {
            required: "This field is required",
            pattern: {
              value: /^(01[0-2,5])[0-9]{8}$/,
              message: "Enter Egyptian number",
            },
          })}
        />
        {errors.phone && errors.phone.type === "required" && (
          <p className={styles.error}>{errors.phone.message}</p>
        )}
        {errors.phone && errors.phone.type === "pattern" && (
          <p className={styles.error}>{errors.phone.message}</p>
        )}
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
