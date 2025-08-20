"use client";

import Image from "next/image";
import classes from "./HeroImageBackground.module.css";

export default function HeroImageBackground() {
  return (
    <div className={classes.wrapper} aria-label="Featured photograph">
      <Image
        src="/hero.webp"
        alt="Featured photograph"
        fill
        priority
        quality={90}         // boolean shorthand; correct per docs
        sizes="100vw"     // required when using fill; hero spans viewport width
        className={classes.heroImg}
        unoptimized
      />
      <div className={classes.inner} />
    </div>
  );
}
