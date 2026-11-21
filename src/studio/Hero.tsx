"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Download, Mail, ArrowUpRight, Sparkles, Terminal as TerminalIcon } from "lucide-react";
import { gsap, ScrollTrigger, SplitText, reducedMotion, setupGsap } from "./motion";
import { Asterisk, Loop } from "./Doodles";
import NeoScene3D from "./NeoScene3D";

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setupGsap();
    const reduce = reducedMotion();
    const fine = window.matchMedia("(pointer: fine)").matches;
    const ctx = gsap.context(() => {
      const split = SplitText.create(".hero-title .ln", { type: "chars" });

      // Everything starts hidden; the intro timeline plays once the loader hands over.
      gsap.set(split.chars, { yPercent: 120 });
      gsap.set(".hero .pill", { scale: 0, rotate: 0 });
      gsap.set(".portrait", { yPercent: 105 });
      gsap.set(".hero-card.l", { xPercent: -140, rotate: -30 });
      gsap.set(".hero-card.r", { xPercent: 140, rotate: 30 });
      gsap.set(".hero-terminal-deck", { y: 50, opacity: 0 });
      gsap.set(".hero .draw", { drawSVG: "0%" });
      gsap.set(".hero-hint", { opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      tl.to(".hero .draw", { drawSVG: "100%", duration: 2.2, ease: "power2.inOut", stagger: 0.12 }, 0)
        .to(split.chars, { yPercent: 0, duration: 1.1, stagger: 0.03 }, 0.2)
        .to(".portrait", { yPercent: 0, duration: 1.5, ease: "expo.out" }, 0.4)
        .to(".hero-card.l", { xPercent: 0, rotate: -7, duration: 1.3, ease: "back.out(1.3)" }, 0.85)
        .to(".hero-card.r", { xPercent: 0, rotate: 6, duration: 1.3, ease: "back.out(1.3)" }, 0.95)
        .to(".hero .pill", { scale: 1, duration: 0.9, ease: "back.out(2.2)", stagger: 0.12, rotate: (i) => [-6, 4, 5, -4][i % 4] }, 1.1)
        .to(".hero-terminal-deck", { y: 0, opacity: 1, duration: 1, ease: "back.out(1.4)" }, 1.25)
        .to(".hero-hint", { opacity: 1, duration: 0.8 }, 1.55);
      intro.current = tl;
      if (reduce) tl.progress(1);

      if (!reduce) {
        // idle float on the tags
        gsap.utils.toArray<HTMLElement>(".hero .pill").forEach((p, i) => {
          gsap.to(p, { y: i % 2 ? -8 : 8, duration: 2.2 + i * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
        gsap.to(".hero-star", { rotate: 360, duration: 14, ease: "none", repeat: -1 });

        // scroll: photo grows subtly, signs and loops drift
        ScrollTrigger.create({
          trigger: root.current, start: "top top", end: "bottom 30%", scrub: 0.6,
          animation: gsap.timeline()
            .to(".portrait", { scale: 1.05, transformOrigin: "50% 100%", ease: "none" }, 0)
            .to(".hero-title", { yPercent: -18, ease: "none" }, 0)
            .to(".hero-card.l", { x: -80, rotate: -14, ease: "none" }, 0)
            .to(".hero-card.r", { x: 80, rotate: 12, ease: "none" }, 0)
            .to(".hero-loops", { yPercent: -16, ease: "none" }, 0),
        });
      }

      if (!reduce && fine) {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-depth]").map((n) => ({
          depth: parseFloat(n.dataset.depth || "0"),
          x: gsap.quickTo(n, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(n, "y", { duration: 0.9, ease: "power3" }),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          nodes.forEach((n) => { n.x(nx * 60 * n.depth); n.y(ny * 40 * n.depth); });
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={root}>
      {/* 3D WebGL Canvas Layer */}
      <NeoScene3D />

      <div className="hero-loops" aria-hidden>
        <Loop className="loop l" />
        <Loop className="loop r" />
      </div>

      <div className="hero-head">
        <h1 className="hero-title">
          <span className="ln">STUDENT DEVELOPER</span>
          <span className="ln">CURIOUS LEARNER</span>
        </h1>
        <span className="pill p1 neo-pill-yellow" data-depth="0.8">Tagore Engg College</span>
        <span className="pill p2 neo-pill-green" data-depth="-0.6"><i className="dot" />Open for projects</span>
        <span className="pill p3 neo-pill-cyan" data-depth="0.6">Chennai, India</span>
        <span className="pill p4 neo-pill-pink" data-depth="-0.8">AI, Web &amp; Embedded</span>
      </div>

      {/* 100% Unobstructed Full Standing Portrait Stage */}
      <div className="hero-stage">
        <div className="hero-card l neo-extruded" data-depth="-0.5"><b>CODE</b></div>
        <div className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="base" src="/me-cut.webp" alt="Nitish S" />
        </div>
        <div className="hero-card r neo-extruded" data-depth="-0.5"><b>BUILD</b></div>
      </div>

      {/* Dedicated Interactive Terminal HUD Deck (Positioned below the portrait, never covers the image) */}
      <div className="hero-terminal-deck">
        <div className="hero-terminal" role="region" aria-label="Developer Terminal HUD">
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="dot r" />
              <span className="dot y" />
              <span className="dot g" />
            </div>
            <span className="terminal-title">
              <TerminalIcon size={14} /> nitish@dev-terminal:~ (bash)
            </span>
            <span className="terminal-badge">
              <Sparkles size={12} /> B.E. CSE 2025-29
            </span>
          </div>
          <div className="terminal-body">
            <div className="t-row">
              <span className="t-pink">&gt;</span> <span className="t-white">whoami</span>
            </div>
            <div className="t-row t-res">
              <span className="t-cyan font-bold">Nitish S.</span> // Engineering Student Exploring Computer Science &amp; AI
            </div>

            <div className="t-row mt-2">
              <span className="t-pink">&gt;</span> <span className="t-white">current_focus</span>
            </div>
            <div className="t-row t-res">
              <span className="t-yellow">AI-Driven Education (NeuroEdu)</span> • <span className="t-green">Wearable Assist Devices (IoT)</span> • <span className="t-cyan">Full-Stack Web</span>
            </div>

            <div className="terminal-actions">
              <a
                href="/nitish-resume.pdf"
                download
                className="neo-btn neo-btn-green"
                aria-label="Download CV (PDF)"
              >
                <Download size={14} /> DOWNLOAD CV
              </a>
              <a
                href="mailto:nitiships14@gmail.com"
                data-contact
                className="neo-btn neo-btn-yellow"
                aria-label="Send Email"
              >
                <Mail size={14} /> TRANSMIT EMAIL
              </a>
              <a
                href="#projects"
                className="neo-btn neo-btn-cyan"
                aria-label="Explore Projects"
              >
                <ArrowUpRight size={14} /> EXPLORE PROJECTS
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-hint">
        <Asterisk className="hero-star" />
        <span>Scroll</span>
        <ArrowDown size={16} strokeWidth={2.4} />
      </div>

    </section>
  );
}
