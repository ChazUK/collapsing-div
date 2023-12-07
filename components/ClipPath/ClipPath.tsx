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
  const [copyHeight, setCopyHeight] = useState<number>(0);
  const [triggerPosition, setTriggerPosition] = useState<number>(0);
  const copyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const copy = copyRef.current;

    if (!title || !copy) return;

    const s = stickyPosition + title.offsetHeight * index;

    setCopyHeight(copy.offsetHeight);
    setStickyPosition(s);
    setTriggerPosition(s + title.offsetHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: copyRef,
    offset: [`start ${triggerPosition}px`, `end ${triggerPosition}px`],
  });
  const h = useTransform(scrollYProgress, [0, 1], [0, copyHeight]);

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
        data-squash={h}
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
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        // Need a way to push progress from scrollYProgress to animate
        // style={{ clipPath: `polygon(0 ${p}%, 100% ${p}%, 100% 100%, 0 100%);` }}
      >
        {children}
      </motion.div>
    </Fragment>
  );
}
