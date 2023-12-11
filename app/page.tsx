import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/sticky-only">Sticky Only</Link>
      <Link href="/height">Height</Link>
      <Link href="/clip-path">Clip Path</Link>
    </main>
  );
}
