import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/height">Height</Link> or{" "}
      <Link href="/clip-path">Clip Path</Link>
    </main>
  );
}
