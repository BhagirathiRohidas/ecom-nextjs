import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hey! There.Welcome to ezShop. </h1>

      <Link href="/pages/home">
        <div style={{ borderStyle: "solid", padding: "10px" }}>Shop Now</div>
      </Link>
    </main>
  );
}
