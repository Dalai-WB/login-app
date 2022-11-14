import styles from "/styles/Log.module.css";
import Link from "next/link";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { setCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", info: "", k: 0 });
  const log = () => {
    if (
      form.email == getCookie("email") &&
      form.password == getCookie("password")
    ) {
      setCookie("login", "Newtersen");
      router.push({ pathname: "../main" });
    } else {
      if (form.email.length == 0) {
        toast.error("email оруулна уу!");
      }
      if (form.password.length == 0) {
        toast.error("нууц үгээ оруулна уу!");
      }
      if (form.email.length > 0 && form.password.length > 0)
        toast.error("email эсвэл нууц үг буруу");
    }
  };
  return (
    <form className={styles.cont}>
      <label className={styles.lab}>
        <h1 className={styles.h1}>Login</h1>
      </label>
      <input
        name="email"
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }}
        className={styles.input}
        type={"text"}
        placeholder={"E-mail"}
      ></input>
      <input
        name="password"
        onChange={(e) => {
          setForm({ ...form, password: e.target.value });
        }}
        className={styles.input}
        type={"password"}
        placeholder={"Password"}
      ></input>
      <div className={styles.input} id={styles.button} onClick={log}>
        Sign in
      </div>
      {/* <input
        className={styles.input}
        id={styles.button}
        onClick={log}
        type="Submit"
        value="Sign in"
      ></input> */}
      <label className={styles.lab}>
        <p className={styles.p}>
          Don't have an account?
          <Link className={styles.link} href={"../register"}>
            {" "}
            sign up
          </Link>
        </p>
      </label>
    </form>
  );
}
