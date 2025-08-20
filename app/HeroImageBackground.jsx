"use client";

import Image from "next/image";
import { Overlay } from "@mantine/core";
import classes from "./HeroImageBackground.module.css";

export default function HeroImageBackground() {
  return (
    <div className={classes.wrapper} aria-label="Featured photograph">
      {/* Keep overlay commented unless you want extra darkening on top of the vignette */}
      {/* <Overlay color="#000" opacity={0.15} zIndex={2} /> */}

    <Image
  src="/hero.webp"
  alt="Featured photograph"
  fill
  priority
  fetchPriority="high"
  /* Cap max delivered width on large screens; smaller = fewer bytes */
  sizes="(max-width: 480px) 100vw,
         (max-width: 768px) 100vw,
         (max-width: 1200px) 100vw,
         1600px"
  /* Lower quality to shrink file (try 60, then 50) */
  quality={60}
  className={classes.heroImg}
/>


      <div className={classes.inner} />
    </div>
  );
}
