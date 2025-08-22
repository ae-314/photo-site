import Image from "next/image";
import Link from "next/link";
import styles from "./Portfolio.module.css";

export const metadata = {
  title: "Portfolio – Photography Portfolio",
  description: "Übersicht der Alben",
};

export default function PortfolioPage() {
  return (
    <main className={styles.page} aria-label="Portfolio">
      <div className={styles.container}>
        <header className={styles.intro}>
          <h1 className={styles.h1}>Portfolio</h1>
          <p className={styles.lead}>
            Eine kuratierte Auswahl aus drei Serien. Tippen oder klicken Sie auf ein Album, um die Galerie zu öffnen.
          </p>
        </header>

        {/* SAME CARDS AS HOME */}
        <div className={styles.grid}>
          <Link href="/astro" className={styles.card} aria-label="Astro Album">
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

          <Link href="/natur" className={styles.card} aria-label="Natur und Landschaft Album">
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

          <Link href="/tiere" className={styles.card} aria-label="Tiere Album">
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
      </div>
    </main>
  );
}
