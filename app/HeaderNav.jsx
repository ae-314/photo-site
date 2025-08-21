"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [opened, { toggle, close }] = useDisclosure(false);
  const largerThanSm = useMediaQuery("(min-width: 48em)");
  const [{ y }] = useWindowScroll();
  const scrolled = y > 10;

  // CHANGE: track when the header itself is hovered (to apply glass/transparent look on hover)
  const [headerHovered, setHeaderHovered] = useState(false);

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

  // track which top link is hovered for per-link glow
  const [hoverKey, setHoverKey] = useState(null);

  const navOnLight = isHome ? scrolled : true; // light text only on home before scroll

  const brandStyle = {
    textDecoration: "none",
    color: navOnLight ? colors.ink : "rgba(248, 246, 246, 0.96)",
    fontWeight: 550,
    fontSize: "clamp(1.4rem, 2.6vw, 2rem)", // 2× body max
    lineHeight: 1.1,
    fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
  };

  // CHANGE: add ringColor that is WHITE on hero, DARK on scroll/inner pages
  const topLink = (href, label, key) => {
    const isHover = hoverKey === key;
    const baseColor  = navOnLight ? colors.ink : "rgba(248, 246, 246, 0.96)";
    const hoverColor = navOnLight ? colors.ink : "rgba(255, 255, 255, 0.98)";
    const ringColor  = navOnLight ? "#0E1826" : "rgba(255,255,255,0.95)"; // ← ring switches based on scroll
    return (
      <Link
        key={key}
        href={href}
        onMouseEnter={() => setHoverKey(key)}
        onMouseLeave={() => setHoverKey(null)}
        onFocus={() => setHoverKey(key)}
        onBlur={() => setHoverKey(null)}
        style={{
          display: "inline-block",
          textDecoration: "none",
          fontWeight: 600,
          color: isHover ? hoverColor : baseColor,
          fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
          transition: "color 120ms ease, background 150ms ease, box-shadow 150ms ease, text-shadow 150ms ease",
          fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
          padding: "6px 10px",
          borderRadius: 8,
          background: isHover
            ? (navOnLight ? colors.hoverBg : "rgba(14, 24, 38, 0.21)")
            : "transparent",
          // CHANGE: keep ring + stronger glow; ringColor is white on hero, #0E1826 on scroll
          boxShadow: isHover
            ? `0 0 0 1px ${ringColor}, 0 0 16px rgba(255,255,255,0.55), 0 0 36px rgba(255,255,255,0.35)`
            : "0 0 0 1px transparent, 0 0 0 rgba(0,0,0,0)",
          // subtle text glow so the label "pops"
          textShadow: isHover ? "0 0 10px rgba(255,255,255,0.45)" : "none",
        }}
      >
        {label}
      </Link>
    );
  };

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
        fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
      }}
    >
      {label}
    </Link>
  );

  // compute header visuals; on home, hovering header shows the same glass as scrolling
  const showGlass = isHome && (scrolled || headerHovered);

  return (
    <header
      onMouseEnter={() => setHeaderHovered(true)}   // CHANGE: trigger glass on hover
      onMouseLeave={() => setHeaderHovered(false)}  // CHANGE
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: isHome
          ? (showGlass ? colors.headerGlass : "transparent")
          : colors.panelGrad, // solid header on inner pages
        backdropFilter: showGlass ? "saturate(140%) blur(10px)" : "none",
        WebkitBackdropFilter: showGlass ? "saturate(140%) blur(10px)" : "none",
        borderBottom: (isHome && !showGlass) ? "1px solid transparent" : `1px solid ${colors.border}`,
        boxShadow: (isHome && !showGlass) ? "none" : "0 10px 28px rgba(0,0,0,0.12)",
        transition: "background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, backdrop-filter 200ms ease",
        fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
      }}
    >
      <Container size="lg" style={{ padding: "36px 16px" }}>
        <Group justify="space-between" wrap="nowrap">
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
            color={navOnLight ? colors.ink : "#fff"}
          />
        </Group>
      </Container>

      {opened && (
        <Portal>
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

/*
CHANGES:
- Added header hover state to show glass background when hovering (same as scrolling).
- In topLink: introduced ringColor and updated boxShadow so the ring is WHITE on hero (not scrolled) and #0E1826 on scroll/inner pages, with a strong white glow in both.
- Kept all your original values and alphas; only added hover/glow behavior and ring color switching.
*/
