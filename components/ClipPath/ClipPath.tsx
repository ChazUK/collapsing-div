"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

import styles from "./clip-path.module.scss";

type Props = {
  stickyPosition: number;
  index: number;
  children?: ReactNode;
};

export default function ClipPath({ stickyPosition, index, children }: Props) {
  const [_stickyPosition, setStickyPosition] = useState<number>(stickyPosition);
  const [triggerPosition, setTriggerPosition] = useState<number>(0);
  const copyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const copy = copyRef.current;

    if (!title || !copy) return;

    const s = stickyPosition + title.offsetHeight * index;

    setStickyPosition(s);
    setTriggerPosition(s + title.offsetHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: copyRef,
    offset: [`start ${triggerPosition}px`, `end ${triggerPosition}px`],
  });
  const p = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <Fragment>
      <div
        className={styles.hr}
        style={{ top: _stickyPosition }}
        data-index={index}
        data-position={_stickyPosition}
      />
      <div
        className={styles.trigger}
        style={{ top: triggerPosition }}
        data-index={index}
        data-position={triggerPosition}
      />

      <h2
        ref={titleRef}
        className={styles.title}
        style={{ top: _stickyPosition }}
      >
        Section Title {index + 1}
      </h2>

      <motion.div
        ref={copyRef}
        className={styles.copy}
        // Need a way to push progress from scrollYProgress to animate
        style={{ clipPath: `inset(${p}% 0% 0% 0%)` }}
      >
        {children}
      </motion.div>
    </Fragment>
  );
}
