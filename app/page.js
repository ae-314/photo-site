import HeroImageBackground from "./HeroImageBackground";
import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <>
      <HeroImageBackground />

      <section className={styles.section} aria-label="Portfolio collections">
        <h2 className={styles.kicker}>Portfolio entdecken</h2>

        <div className={styles.grid}>
          <Link href="/astro" className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/albums/astro/cover.webp"
                alt="Astro"
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                className={styles.coverImg}
              />
            </div>
            <div className={styles.title}>Astro</div>
          </Link>

          <Link href="/natur" className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/albums/natur/cover.webp"
                alt="Natur und Landschaft"
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                className={styles.coverImg}
              />
            </div>
            <div className={styles.title}>Natur und Landschaft</div>
          </Link>

          <Link href="/tiere" className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/albums/tiere/cover.webp"
                alt="Tiere"
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                className={styles.coverImg}
              />
            </div>
            <div className={styles.title}>Tiere</div>
          </Link>
        </div>
      </section>
    </>
  );
}
