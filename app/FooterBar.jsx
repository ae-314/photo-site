// Small translucent footer matching the dark section palette
import { Container } from "@mantine/core";

export default function FooterBar() {
  return (
    <footer
      style={{
        marginTop: "clamp(28px, 6vw, 72px)",                 // space before footer
        background: "rgba(14, 24, 38, 0.45)",                // smoky glass over #0E1826
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",       // subtle divider (like cards)
        color: "rgba(242, 238, 238, 0.92)",                  // same off-white as elsewhere
        fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
      }}
    >
      <Container size="lg" style={{ padding: "10px 16px" }}> {/* thin footer */}
        <div style={{ textAlign: "center", fontSize: "0.95rem", lineHeight: 1.5 }}>
          Alle Fotografien und Inhalte © Evi Wendlinger
        </div>
      </Container>
    </footer>
  );
}
