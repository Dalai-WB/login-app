import styles from "../styles/Home.module.css";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// const getServerSideProps = () => {
//   const user = getCookie("username");
//   return { props: { user } };
// };
export default function Home() {
  const [get, set] = useState("");
  const router = useRouter();

  useEffect(() => {
    set(getCookie("fName"));
    if (getCookie("login") != "Newtersen") router.replace("/");
  }, []);
  return <div className={styles.background}>Hello, {get}</div>;
}
