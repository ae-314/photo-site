import HeroImageBackground from "./HeroImageBackground";
import { Container } from "@mantine/core";

export default function Home() {
  return (
    <main>
      <HeroImageBackground />
      {/* simple content so you can scroll and see header change */}
      <section style={{ background: "#fff" }}>
        <Container size="lg" style={{ padding: "32px 16px" }}>
          <h2>View the Portfolio Collection:</h2>
          {/* album sections will go here next */}
        </Container>
      </section>
    </main>
  );
}
