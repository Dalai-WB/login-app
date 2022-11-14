import styles from "/styles/Sign.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lname: "",
    gender: "",
    date: "",
    email: "",
    password: "",
    number: "",
  });
  const [err, setErr] = useState({ error: "" });

  const save = () => {
    var pass = isPasswordValid(form.password);
    if (
      form.firstname.length != 0 &&
      form.lname.length != 0 &&
      form.email.indexOf("@") != -1 &&
      form.email.indexOf(".") != -1 &&
      pass &&
      form.bornDate != "" &&
      form.number.length === 8 &&
      form.gender != ""
    ) {
      setErr("");
      setCookie("fName", form.firstname);
      setCookie("lName", form.lname);
      setCookie("email", form.email);
      setCookie("password", form.password);
      setCookie("date", form.date);
      setCookie("gender", form.gender);
      setCookie("number", form.number);
      router.push({ pathname: "../", query: { type: "Success" } });
      return;
    } else {
      toast.error("Бүртгэл амжилтгүй");
      if (form.firstname.length === 0) {
        setErr({ error: "firstname алдаатай байна." });
        return;
      }
      if (form.lname.length === 0) {
        setErr({ error: "lastname алдаатай байна." });
        return;
      }
      if (form.email.indexOf("@") == -1 || form.email.indexOf(".") == -1) {
        setErr({ error: "email алдаатай байна.(example@gmail.com)" });
        return;
      }
      if (form.number.length != 8) {
        setErr({ error: "утасны дугаар 8 оронтой байх ёстой." });
        return;
      }
      if (form.password.length < 6) {
        setErr({ error: "нууц үг 6-аас их тэмдэгттэй байх ёстой." });
        return;
      }
      if (form.date === "") {
        setErr({ error: "төрсөн он сар өдрөө оруулна уу." });
        return;
      }
      if (form.gender === "") {
        setErr({ error: "хүйсээ сонгоно уу." });
        return;
      }
    }
  };
  function isPasswordValid(p) {
    let regex =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
    if (!regex.test(p)) {
      setErr({
        error:
          "password should contain atleast one number and one special character",
      });

      return false;
    } else return true;
  }

  // function isEmailValid(email) {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
  //     return true;
  //   } else return false;
  // }
  return (
    <form className={styles.cont} onSubmit={save}>
      <label className={styles.lab}>
        <h1 className={styles.h1}>Register</h1>
        <label className={styles.error}>{err.error}</label>
        <ToastContainer />
      </label>
      <div className={styles.names}>
        <input
          name="firsName"
          onChange={(e) => {
            setForm({ ...form, firstname: e.target.value });
          }}
          className={styles.input}
          type={"text"}
          placeholder={"First name"}
        ></input>
        <input
          name="lastName"
          onChange={(e) => {
            setForm({ ...form, lname: e.target.value });
          }}
          className={styles.input}
          type={"text"}
          placeholder={"Last name"}
        ></input>
      </div>
      <input
        name="Date"
        onChange={(e) => {
          setForm({ ...form, date: e.target.value });
        }}
        className={styles.input}
        id={styles.date}
        type={"Date"}
      ></input>
      <input
        name="email"
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }}
        className={styles.input}
        type={"email"}
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
      <input
        name="number"
        onChange={(e) => {
          setForm({ ...form, number: e.target.value });
        }}
        className={styles.input}
        type={"text"}
        placeholder={"Phone number"}
      ></input>
      <div className={styles.input} id={styles.radioCont}>
        <input
          onChange={(e) => {
            setForm({ ...form, gender: e.target.value });
          }}
          className={styles.radio}
          type="radio"
          value="Male"
          name="gender"
        />{" "}
        Male
        <input
          onChange={(e) => {
            setForm({ ...form, gender: e.target.value });
          }}
          className={styles.radio}
          type="radio"
          value="Female"
          name="gender"
        />{" "}
        Female
        <input
          onChange={(e) => {
            setForm({ ...form, gender: e.target.value });
          }}
          className={styles.radio}
          type="radio"
          value="Other"
          name="gender"
        />{" "}
        Other
      </div>
      <div
        onClick={save}
        className={styles.input}
        id={styles.button}
        type={"submit"}
      >
        Sign up
      </div>

      <label className={styles.lab}>
        <p className={styles.p}>
          Have an account already?
          <Link className={styles.link} href={"../"}>
            {" "}
            sign in
          </Link>
        </p>
      </label>
    </form>
  );
}
