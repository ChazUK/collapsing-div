"use client";

import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

import styles from "./sticky-section.module.scss";

type Props = {
  stickyPosition: number;
  index: number;
  children?: ReactNode;
};

export default function StickySection({
  stickyPosition,
  index,
  children,
}: Props) {
  const [_stickyPosition, setStickyPosition] = useState<number>(stickyPosition);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;

    if (!title) return;

    const s = stickyPosition + title.offsetHeight * index;

    setStickyPosition(s);
  }, [index, stickyPosition]);

  return (
    <Fragment>
      <h2
        ref={titleRef}
        className={styles.title}
        style={{ top: _stickyPosition }}
      >
        Section Title {index + 1}
      </h2>

      <div className={styles.copy}>{children}</div>
    </Fragment>
  );
}
