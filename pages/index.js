import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Log from "./comp/log.js";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
export const getServerSideProps = (context) => {
  const type = context.query.type;
  return { props: { type: type == undefined ? "hoooson" : type } };
};

export default function Home({ type }) {
  const router = useRouter();
  console.log(router.query.type);
  let k = 0;
  useEffect(() => {
    toasta(k);
    k++;
  }, []);
  function toasta(k) {
    if (type === "Success" && k == 0) {
      k++;
      toast.success("Бүртгэл амжилттай");
    }
  }
  return (
    <div className={styles.background}>
      <ToastContainer />
      <section className={styles.container}>
        <div className={styles.sec1}>
          <p className={styles.p}>Welcome back</p>
        </div>
        <div className={styles.sec2}>
          <Log />
        </div>
      </section>
    </div>
  );
}
