export default function About() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.6 }}>
      <h1>About</h1>
      <p>
        Lichtblicke by E.W. View the portfolio collection:  — <strong>Astro</strong>,{" "}
        <strong>Natur und Landschaft</strong>, and <strong>Tiere</strong>.
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:yourname@example.com">yourname@example.com</a>
      </p>

      <h2>Support the work</h2>
      <p>
        If you’d like to support, you can{" "}
        <a href="https://www.buymeacoffee.com/yourname" target="_blank" rel="noopener noreferrer">
          buy me a coffee
        </a>.
      </p>

      <hr style={{ margin: "24px 0" }} />

      <p style={{ fontSize: 14, color: "#666" }}>
        (TODO: add floating widget later (optional))
      </p>
    </main>
  );
}
