"use client";

import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

import styles from "./sticky-section.module.scss";

type Props = {
  stickyPosition: number;
  index: number;
  children?: ReactNode;
  debug?: boolean;
};

export default function StickySection({
  stickyPosition,
  index,
  children,
  debug,
}: Props) {
  const [_stickyPosition, setStickyPosition] = useState<number>(stickyPosition);
  const [copyHeight, setCopyHeight] = useState<number>(0);
  const [triggerPosition, setTriggerPosition] = useState<number>(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const copy = copyRef.current;

    if (!title || !copy) return;

    setCopyHeight(copy.offsetHeight);
    setStickyPosition(stickyPosition + title.offsetHeight * index);
    setTriggerPosition(_stickyPosition + title.offsetHeight);
  }, []);

  return (
    <Fragment>
      <div
        className={styles.hr}
        style={{ top: _stickyPosition }}
        data-index={index}
        data-position={_stickyPosition}
      />
      <h2
        ref={titleRef}
        className={styles.title}
        style={{ top: _stickyPosition }}
      >
        Section Title {index + 1} {copyHeight}
      </h2>
      <div className={styles.ghostainer} style={{ height: copyHeight }}>
        <div ref={copyRef} className={styles.copy}>
          {children}
        </div>
      </div>
    </Fragment>
  );
}
