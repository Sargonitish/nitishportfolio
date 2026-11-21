"use client";

import { useEffect, useState } from "react";
import { Terminal, X, ShieldAlert, Cpu, Sparkles } from "lucide-react";

export default function EasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const code = ["n", "i", "t", "i", "s", "h"];
    let keys: string[] = [];

    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input or textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key === "Escape") {
        setActive(false);
        return;
      }

      keys.push(e.key.toLowerCase());
      if (keys.length > code.length) {
        keys.shift();
      }

      if (keys.join("") === code.join("")) {
        setActive(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!active) return null;

  return (
    <div className="glitch-overlay" role="dialog" aria-modal="true" aria-label="System Override">
      <div className="glitch-scanlines" />
      <div className="glitch-modal">
        <div className="glitch-header">
          <div className="glitch-dots">
            <span className="dot r" />
            <span className="dot y" />
            <span className="dot g" />
          </div>
          <span className="glitch-title">
            <ShieldAlert size={16} /> SYSTEM_OVERRIDE.EXE // DEV_ROOT
          </span>
          <button
            className="glitch-close"
            onClick={() => setActive(false)}
            aria-label="Close Override"
          >
            <X size={18} />
          </button>
        </div>

        <div className="glitch-content">
          <div className="glitch-glitch-text" data-text="SYSTEM_OVERRIDE">
            SYSTEM_OVERRIDE
          </div>

          <p className="glitch-sub">
            IDENTIFIED: <b>NITISH S</b> // STUDENT DEVELOPER ACCESS GRANTED
          </p>

          <div className="glitch-grid">
            <div className="glitch-box">
              <span className="lbl"><Terminal size={14} /> ARCHITECTURE</span>
              <b>Tagore Engg College (B.E. CSE)</b>
              <small>Chennai, India • Class of 2029</small>
            </div>
            <div className="glitch-box">
              <span className="lbl"><Cpu size={14} /> ACTIVE ENGINES</span>
              <b>NeuroEdu AI • Visual Assist IoT</b>
              <small>Python • React • Embedded C++</small>
            </div>
            <div className="glitch-box">
              <span className="lbl"><Sparkles size={14} /> HONORS</span>
              <b>2nd Prize VIT Ideathon</b>
              <small>IIT Madras Certified • NPTEL Cloud</small>
            </div>
          </div>

          <div className="glitch-cli">
            <span className="prmpt">&gt;</span> STATUS: OPERATIONAL
            <br />
            <span className="prmpt">&gt;</span> KEYCODE VERIFIED: &quot;NITISH&quot;
            <br />
            <span className="prmpt">&gt;</span> READY TO ENGINEER HIGH-IMPACT TECHNOLOGY.
          </div>

          <div className="glitch-actions">
            <a
              href="/nitish-resume.pdf"
              download
              className="neo-btn"
              style={{ background: "var(--neo-green)", color: "#0d0d0d" }}
            >
              DOWNLOAD CV (PDF)
            </a>
            <button
              className="neo-btn"
              style={{ background: "var(--neo-yellow)", color: "#0d0d0d" }}
              onClick={() => {
                setActive(false);
                window.dispatchEvent(new CustomEvent("contact:open"));
              }}
            >
              INITIALIZE CONTACT
            </button>
            <button
              className="neo-btn"
              style={{ background: "#ffffff", color: "#0d0d0d" }}
              onClick={() => setActive(false)}
            >
              RETURN [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
