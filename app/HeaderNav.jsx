"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import { Container, Group, Burger, Stack, Divider, Portal, CloseButton } from "@mantine/core";

/*
  GLASS / TINT CONTROLS (TWEAK HERE)
  - headerGlass: used for the top header when it turns glassy on scroll/hover.
  - overlayTint: full-screen veil behind the slide-out menu (burger overlay).
  - panelGlass:  background tint of the slide-out menu itself.
  Adjust RGBA alpha to increase/decrease translucency, and tweak hue to change color.
*/
const colors = {
  headerGlass: "rgba(241, 248, 210, 0.13)", // header glass (leave as-is unless you want to change header tone)
  overlayTint: "rgba(14, 24, 38, 0.45)",    // ← smoky dark veil behind the panel (burger overlay)
  panelGlass:  "#5923239e",                  // ← glass color of the slide-out panel
  panelGrad:   "linear-gradient(180deg, #BF5A50, #0E1826", // used for SOLID inner-page header (not the panel)
  ink: "#0a0a0aff",
  border: "rgba(0,0,0,0.14)",
  hoverBg: "rgba(187, 175, 175, 0.35)",
  
};

export default function HeaderNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPortfolio = pathname === "/portfolio"; // ← NEW: portfolio page flag

  const [opened, { toggle, close }] = useDisclosure(false);
  const largerThanSm = useMediaQuery("(min-width: 48em)");
  const [{ y }] = useWindowScroll();
  const scrolled = y > 10;

  // Only treat hover on real hover devices (prevents tap-at-top reveal on mobile)
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  // Compact header for short/landscape mobile viewports
  const compactLandscape = useMediaQuery("(max-height: 420px) and (orientation: landscape)");

  const [headerHovered, setHeaderHovered] = useState(false);

  useEffect(() => { if (largerThanSm && opened) close(); }, [largerThanSm, opened, close]);
  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [opened]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    if (opened) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opened, close]);

  const [hoverKey, setHoverKey] = useState(null);

  // ORIGINAL LOGIC, then override on /portfolio to force white text
  const _navOnLight = isHome ? scrolled : true;
  const navOnLight = isPortfolio ? false : _navOnLight; // ← NEW: white text on portfolio (false = use light text color)

  // Compact typography/padding when compactLandscape
  const brandFontSize = compactLandscape ? "clamp(1.15rem, 2.2vw, 1.55rem)" : "clamp(1.4rem, 2.6vw, 2rem)";
  const linkFontSize  = compactLandscape ? "clamp(1.02rem, 2vw, 1.15rem)"   : "clamp(1.05rem, 2.2vw, 1.25rem)";
  const headerPad     = compactLandscape ? "18px 12px" : "36px 16px";
  const burgerSize    = compactLandscape ? "xs" : "sm";

  const brandStyle = {
    textDecoration: "none",
    color: navOnLight ? colors.ink : "rgba(236, 228, 228, 0.96)", // ← will be white on /portfolio
    fontWeight: 550,
    fontSize: brandFontSize,
    lineHeight: 1.1,
    fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
  };

  const topLink = (href, label, key) => {
    const isHover = hoverKey === key;
    const baseColor  = navOnLight ? colors.ink : "rgba(248, 246, 246, 0.96)"; // ← white on /portfolio
    const hoverColor = navOnLight ? colors.ink : "rgba(255, 255, 255, 0.98)";
    const ringColor  = navOnLight ? "#0E1826" : "rgba(255,255,255,0.95)"; // dark on scroll, white on hero/portfolio
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
          fontSize: linkFontSize,
          transition: "color 120ms ease, background 150ms ease, box-shadow 150ms ease, text-shadow 150ms ease",
          fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
          padding: compactLandscape ? "4px 8px" : "6px 10px",
          borderRadius: 8,
          background: isHover
            ? (navOnLight ? colors.hoverBg : "rgba(104, 107, 111, 0.43)")
            : "transparent",
          boxShadow: isHover
            ? `0 0 0 1px ${ringColor}, 0 0 16px rgba(255,255,255,0.55), 0 0 36px rgba(255,255,255,0.35)`
            : "0 0 0 1px transparent, 0 0 0 rgba(0,0,0,0)",
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
        color: "white",
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

  // Only show glass if scrolled OR (device can hover AND header is hovered)
  const showGlass = isHome && (scrolled || (canHover && headerHovered));

  return (
    <header
      onMouseEnter={() => setHeaderHovered(true)}
      onMouseLeave={() => setHeaderHovered(false)}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: isHome
          ? (showGlass ? colors.headerGlass : "transparent")
          : colors.panelGrad,
        backdropFilter: showGlass ? "saturate(140%) blur(10px)" : "none",
        WebkitBackdropFilter: showGlass ? "saturate(140%) blur(10px)" : "none",
        // ↓ NEW: no bottom border on the portfolio page
        borderBottom:0,
        boxShadow: (isHome && !showGlass) ? "none" : "0 10px 28px rgba(0,0,0,0.12)",
        transition: "background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, backdrop-filter 200ms ease",
        fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
      }}
    >
      <Container size="lg" style={{ padding: headerPad }}>
        <Group justify="space-between" wrap="nowrap">
          <Link href="/" style={brandStyle} aria-label="Home">
            <span style={{ display: "block" }}>LichtBlicke</span>
            <span style={{ display: "block", fontSize: "0.62em", fontWeight: 400 }}>
              von Evi Wendlinger
            </span>
          </Link>

          <Group gap="md" visibleFrom="sm">
            {topLink("/portfolio", "Portfolio", "portfolio-top")}
            {topLink("/about", "Über mich", "about-top")}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
            hiddenFrom="sm"
            size={burgerSize}
            color={isPortfolio ? "#fff" : (navOnLight ? colors.ink : "#fff")} // ← NEW: white icon on /portfolio
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
              backdropFilter: "saturate(140%) blur(12px)",
              WebkitBackdropFilter: "saturate(140%) blur(12px)",
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
              background: colors.panelGlass,
              backdropFilter: "saturate(140%) blur(12px)",
              WebkitBackdropFilter: "saturate(140%) blur(12px)",
              borderLeft: `1px solid rgba(255,255,255,0.12)`,
              boxShadow: "-24px 0 40px rgba(0,0,0,0.32), 0 0 44px rgba(255,247,230,0.08)",
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
              <div style={{ fontWeight: 700, color: "rgba(248, 246, 246, 0.96)" }}>Menu</div>
              <CloseButton aria-label="Close menu" onClick={close} size="lg" />
            </div>

            <nav style={{ width: "100%", marginTop: 4, display: "flex", flex: 1, alignItems: "center" }}>
              <Stack gap={10} align="flex-end" style={{ width: "100%", paddingBottom: 16 }}>
                {item("/", "Home", "home", true)}
                {item("/portfolio", "Portfolio", "portfolio", true)}
                {item("/about", "Über mich", "about", true)}
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
- Added `isPortfolio` flag and override so `navOnLight` becomes `false` on /portfolio → header text is white there.
- Set `borderBottom` to transparent when `isPortfolio` to remove the bottom border on that page only.
- Burger icon color is forced to white on /portfolio.
*/
