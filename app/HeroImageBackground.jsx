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
        src="/hero.avif"        // file must exist at /public/hero.avif
        alt="Featured photograph"
        fill
        priority
        sizes="100vw"
        className={classes.heroImg}
      />

      <div className={classes.inner} />
    </div>
  );
}
