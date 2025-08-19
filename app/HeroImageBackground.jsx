"use client";

import { Overlay } from "@mantine/core";
import classes from "./HeroImageBackground.module.css";

export default function HeroImageBackground() {
  return (
    <div className={classes.wrapper} aria-label="Featured photograph">
      {/* subtle darkening helps the transparent header over bright images */}
      {/* <Overlay color="#000" opacity={0.15} zIndex={1} /> */}
      <div className={classes.inner} />
    </div>
  );
}
