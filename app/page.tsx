"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const apps = [
  { id: "arrows", number: "01", name: "Arrows Puzzle", subtitle: "Tap Escape", category: "Logic puzzle", installs: "10+", description: "Study every direction, find the open path and clear the board in the right sequence. A compact logic challenge where every tap matters.", image: "/apps/arrows.png", color: "#ff4d38", ink: "#160d12", url: "https://play.google.com/store/apps/details?id=com.elbow.group.arrpws.puzzle.tap.escape" },
  { id: "grill", number: "02", name: "Grill Sort", subtitle: "Puzzle", category: "Food sorting", installs: "500+", description: "Sort colorful grill food, match the right pieces and complete satisfying skewer puzzles with simple, relaxing controls.", image: "/apps/grill.png", color: "#ffd25e", ink: "#311a04", url: "https://play.google.com/store/apps/details?id=com.elbow.group.sort.grill.puzzle" },
  { id: "tower", number: "03", name: "Tower Hero", subtitle: "Dragon Battle", category: "Arcade adventure", installs: "10+", description: "Climb a dangerous fantasy tower, dodge traps, collect treasure and battle monsters on the way to the dragon above.", image: "/apps/tower.png", color: "#b79cff", ink: "#211437", url: "https://play.google.com/store/apps/details?id=com.Elbow.Group.Tower.Hero.Dragon.Battle" },
  { id: "skinrox", number: "04", name: "SkinRox", subtitle: "Skin Maker", category: "Creative tools", installs: "10K+", description: "Create, color and refine custom character skins with approachable tools built for playful avatar experimentation.", image: "/apps/skinrox.png", color: "#55e6c1", ink: "#09271f", url: "https://play.google.com/store/apps/details?id=com.Elbow.Grope.SkinRox.skin.maker" },
  { id: "nonogram", number: "05", name: "Nonogram", subtitle: "Logic Puzzle", category: "Picture logic", installs: "100+", description: "Decode number clues, fill the grid and reveal hidden pixel art through hundreds of focused picture-cross puzzles.", image: "/apps/nonogram.png", color: "#7eb5ff", ink: "#0d1e35", url: "https://play.google.com/store/apps/details?id=com.Elbow.Grope.Nonogram.Logic.Puzzle" },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const move = useCallback((direction: number) => setActive((current) => (current + direction + apps.length) % apps.length), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Elbow Group home"><span className="brand-mark">E.</span><span>ELBOW GROUP</span></a>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#studio" onClick={() => setMenuOpen(false)}>Studio</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "Close" : "Menu"}</button>
      </nav>

      <header className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent mobile studio · Kazakhstan</p>
          <h1>Small games.<br /><em>Big character.</em></h1>
          <p className="hero-intro">We create playful mobile experiences that are instantly clear, satisfying to master, and hard to put down.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#projects">Explore our games <span>↓</span></a>
            <a className="text-link" href="https://play.google.com/store/apps/developer?id=Elbow+Group" target="_blank" rel="noreferrer">Google Play ↗</a>
          </div>
        </div>
        <div className="hero-art" aria-label="Elbow Group app collection">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-disc"><span>PLAY</span><strong>5</strong><span>WAYS</span></div>
          {apps.map((app, index) => <div className={`floating-icon float-${index + 1}`} key={app.id}><img src={app.image} alt="" /></div>)}
          <p className="spin-label">DRAG · TAP · THINK · PLAY ·</p>
        </div>
      </header>

      <section className="ticker" aria-hidden="true"><div>PUZZLES <b>✦</b> ARCADE <b>✦</b> CREATIVE TOOLS <b>✦</b> MOBILE EXPERIENCES <b>✦</b> PUZZLES <b>✦</b> ARCADE <b>✦</b></div></section>

      <section className="studio shell" id="studio">
        <div className="section-number">01 / STUDIO</div>
        <div className="studio-grid">
          <h2>We make moments<br />worth <em>replaying.</em></h2>
          <div className="studio-copy">
            <p>Elbow Group is an independent mobile studio exploring puzzles, arcade adventures, and creative tools. Different worlds, one idea: the best interaction is the one you understand by touching it.</p>
            <div className="principles">
              <div><span>01</span><strong>Clear at first touch</strong></div><div><span>02</span><strong>Depth over noise</strong></div><div><span>03</span><strong>Made with personality</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="shell projects-heading">
          <div><div className="section-number">02 / SELECTED PROJECTS</div><h2>Pick your<br /><em>next obsession.</em></h2></div>
          <div className="carousel-tools"><span>{String(active + 1).padStart(2, "0")} / {String(apps.length).padStart(2, "0")}</span><button onClick={() => move(-1)} aria-label="Previous project">←</button><button onClick={() => move(1)} aria-label="Next project">→</button></div>
        </div>
        <div className="carousel-viewport" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
          <div className="carousel-track" style={{ transform: `translateX(calc(50vw - ${active} * var(--card-step) - var(--card-half)))` }}>
            {apps.map((app, index) => (
              <article className={`project-card ${index === active ? "is-active" : ""}`} key={app.id} style={{ "--card-color": app.color, "--card-ink": app.ink } as React.CSSProperties} onClick={() => setActive(index)}>
                <div className="card-top"><span>{app.number}</span><span>{app.category}</span></div>
                <div className="app-lockup"><div className="app-icon"><img src={app.image} alt={`${app.name} app icon`} /></div><div><h3>{app.name}</h3><p>{app.subtitle}</p></div></div>
                <p className="card-description">{app.description}</p>
                <div className="card-bottom"><div><small>Google Play</small><strong>{app.installs} downloads</strong></div><a href={app.url} target="_blank" rel="noreferrer" aria-label={`Open ${app.name} on Google Play`}>↗</a></div>
              </article>
            ))}
          </div>
        </div>
        <div className="carousel-dots shell" role="tablist" aria-label="Choose project">
          {apps.map((app, index) => <button key={app.id} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} role="tab" aria-selected={index === active} aria-label={`Show ${app.name}`} />)}
        </div>
      </section>

      <section className="cta shell" id="contact">
        <p className="eyebrow"><span /> What are you playing next?</p><h2>Find your new<br /><em>favorite.</em></h2>
        <div className="cta-row"><a className="button button-dark" href="https://play.google.com/store/apps/developer?id=Elbow+Group" target="_blank" rel="noreferrer">Visit us on Google Play <span>↗</span></a><p>Five worlds. One studio.<br />Available on Android.</p></div>
      </section>

      <footer className="footer shell">
        <a className="brand" href="#top"><span className="brand-mark">E.</span><span>ELBOW GROUP</span></a><p>Independent mobile studio<br />Taraz, Kazakhstan</p><p>© 2026 Elbow Group<br />Play on.</p><a className="back-top" href="#top">↑</a>
      </footer>
    </main>
  );
}
