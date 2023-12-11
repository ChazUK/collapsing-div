"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./height-animated.module.scss";

type Props = {
  stickyPosition: number;
  index: number;
  children?: ReactNode;
};

export default function HeightAnimated({
  stickyPosition,
  index,
  children,
}: Props) {
  const [_stickyPosition, setStickyPosition] = useState<number>(stickyPosition);
  const [copyHeight, setCopyHeight] = useState<number>(0);
  const [triggerPosition, setTriggerPosition] = useState<number>(0);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const copy = copyRef.current;

    if (!title || !copy) return;

    const s = stickyPosition + title.offsetHeight * index;

    setCopyHeight(copy.offsetHeight);
    setStickyPosition(s);
    setTriggerPosition(s + title.offsetHeight);
  }, [index, stickyPosition, children]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: [`start ${triggerPosition}px`, `end ${triggerPosition}px`],
  });
  const h = useTransform(scrollYProgress, [0, 1], [copyHeight, 0]);

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

      <div
        ref={scrollRef}
        className={styles.ghostainer}
        style={{ height: copyHeight === 0 ? "auto" : copyHeight }}
      >
        <motion.div
          className={styles.squashtainer}
          style={{
            height: copyHeight === 0 ? "auto" : h,
            position: Boolean(copyHeight) ? "absolute" : "initial",
          }}
        >
          <div
            ref={copyRef}
            className={styles.copy}
            style={{ position: Boolean(copyHeight) ? "absolute" : "initial" }}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
}
