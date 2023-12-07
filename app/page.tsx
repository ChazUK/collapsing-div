import StickySection from "@/components/StickySection/StickySection";
import { Fragment } from "react";
import LoremIpsum from "react-lorem-ipsum";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <Fragment>
      <div className={styles["spacer"]} />
      <div className={styles["page-container"]}>
        <h1 className={styles["header"]}>Hello World</h1>

        {new Array(3).fill(null).map((_, i) => (
          <StickySection key={i} stickyPosition={100} index={i}>
            <LoremIpsum p={3} />
          </StickySection>
        ))}
      </div>
      <div className={styles["spacer--large"]} />
    </Fragment>
  );
}
