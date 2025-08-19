"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { Container, Group, Burger, Stack, Divider, Portal, CloseButton } from "@mantine/core";

const colors = {
  headerGlass: "rgba(241, 248, 210, 0.13)", // your light tint on scroll
  overlayTint: "rgba(245, 245, 245, 0.12)", // blur veil; page still visible
  panelGrad: "linear-gradient(180deg, #f0f0f0 0%, #e6e6e6 100%)", // light smoke grey gradient
  ink: "#000000",
  border: "rgba(0,0,0,0.14)",
  hoverBg: "rgba(0,0,0,0.06)",
};

export default function HeaderNav() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const largerThanSm = useMediaQuery("(min-width: 48em)");
  const [{ y }] = useWindowScroll();
  const scrolled = y > 10;

  // close on desktop resize; lock body scroll while open
  useEffect(() => { if (largerThanSm && opened) close(); }, [largerThanSm, opened, close]);
  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [opened]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    if (opened) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opened, close]);

  const [hoverKey, setHoverKey] = useState(null);

  const brandStyle = {
    textDecoration: "none",
    color: scrolled ? colors.ink : "#fff",
    fontWeight: 400, // keep your current weight
    fontSize: "clamp(1.4rem, 2.6vw, 2rem)", // 2× body max
    lineHeight: 1.1,
    fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
  };

  const topLink = (href, label, key) => (
    <Link
      key={key}
      href={href}
      style={{
        textDecoration: "none",
        fontWeight: 400,
        color: scrolled ? colors.ink : "#fff",
        fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
        transition: "color 120ms ease",
        fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif', // ensure same font
      }}
    >
      {label}
    </Link>
  );

  const item = (href, label, key, big = false) => (
    <Link
      key={key}
      href={href}
      onClick={close}
      onMouseEnter={() => setHoverKey(key)}
      onMouseLeave={() => setHoverKey(null)}
      style={{
        display: "block",
        textDecoration: "none",
        color: colors.ink,
        fontWeight: 400,
        textAlign: "right",
        padding: big ? "14px 16px" : "12px 14px",
        borderRadius: 8,
        background: hoverKey === key ? colors.hoverBg : "transparent",
        transition: "background 120ms ease",
        fontSize: big ? "clamp(24px, 3.2vw, 36px)" : "clamp(18px, 2.4vw, 28px)",
        fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif', // ensure same font
      }}
    >
      {label}
    </Link>
  );

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? colors.headerGlass : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${colors.border}` : "1px solid transparent",
        boxShadow: scrolled ? "0 10px 28px rgba(0,0,0,0.12)" : "none",
        transition: "background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, backdrop-filter 200ms ease",
        fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
      }}
    >
      <Container size="lg" style={{ padding: "36px 16px" }}>
        <Group justify="space-between" wrap="nowrap">
          {/* Title link with two sizes, same font */}
          <Link href="/" style={brandStyle} aria-label="Home">
            <span style={{ display: "block" }}>LichtBlicke</span>
            <span style={{ display: "block", fontSize: "0.62em", fontWeight: 400 }}>
              von Evi Wendlinger
            </span>
          </Link>

          <Group gap="md" visibleFrom="sm">
            {topLink("/portfolio", "Portfolio", "portfolio-top")}
            {topLink("/about", "About", "about-top")}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
            hiddenFrom="sm"
            size="sm"
            color={scrolled ? colors.ink : "#fff"}
          />
        </Group>
      </Container>

      {/* === FULL-PAGE BLUR OVERLAY + RIGHT-SIDE COLUMN (scrollable) === */}
      {opened && (
        <Portal>
          {/* Blur the whole page (header + body) but keep it visible */}
          <div
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              background: colors.overlayTint,
              backdropFilter: "saturate(140%) blur(10px)",
              WebkitBackdropFilter: "saturate(140%) blur(10px)",
              overscrollBehavior: "contain",
            }}
          />

          {/* Right column menu panel */}
          <div
            aria-label="Menu panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100svh",
              width: "min(420px, 55vw)",
              zIndex: 2001,
              background: colors.panelGrad,
              borderLeft: `1px solid ${colors.border}`,
              boxShadow: "-24px 0 40px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              padding: "18px 16px",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              transform: "translateX(0)",
              animation: "slideIn 160ms ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: colors.ink }}>Menu</div>
              <CloseButton aria-label="Close menu" onClick={close} size="lg" />
            </div>

            <nav style={{ width: "100%", marginTop: 4, display: "flex", flex: 1, alignItems: "center" }}>
              <Stack gap={10} align="flex-end" style={{ width: "100%", paddingBottom: 16 }}>
                {item("/", "Home", "home", true)}
                {item("/portfolio", "Portfolio", "portfolio", true)}
                {item("/about", "About", "about", true)}
                <Divider my={12} style={{ borderColor: colors.border, width: "100%" }} />
                {item("/astro", "Astro", "astro")}
                {item("/natur", "Natur und Landschaft", "natur")}
                {item("/tiere", "Tiere", "tiere")}
              </Stack>
            </nav>
          </div>

          <style jsx global>{`
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to   { transform: translateX(0); }
            }
          `}</style>
        </Portal>
      )}
    </header>
  );
}
