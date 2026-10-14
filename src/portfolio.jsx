import React, { useState, useEffect, useRef } from "react";
import "./Portfolio.css";
import {
  Moon,
  SunMedium,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  Send,
  Pencil,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";

/* ---------------------------------------------------------
   CONTENT — edit this to add/remove/change starting projects
--------------------------------------------------------- */
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Digital Art Gallery",
    tag: "ILLUSTRATION",
    type: "image",
    src: "/arts_portfolio.jpg",
    blurb: "Character illustrations and sketches — expressive line work, distinct palettes.",
    detail:
      "A collection of my digital art and sketches, featuring stylized character designs, character portraits, and dynamic layouts. I focus on expressive line work and distinct color palettes to bring these characters to life.",
    tools: "Clip Studio Paint · Digital Illustration",
  },
  {
    id: 2,
    title: "JPCS NITE — Presentation",
    tag: "DESIGN",
    type: "image",
    src: "/jpcs.png",
    blurb: "The official presentation deck for JPCS NITE 2026.",
    detail:
      "Designed and developed the official presentation deck for the JPCS NITE 2026 event. I collaborated closely with key organizers to structure the content flow, ensuring critical information was delivered clearly and impactfully. This deliverable served as the central visual anchor for the event, significantly enhancing audience engagement and facilitation.",
    tools: "Canva",
  },
  {
    id: 3,
    title: "Point-of-Sale System",
    tag: "DEVELOPMENT",
    type: "video",
    src: "/POS.mp4",
    blurb: "A full POS flow — transactions, receipts, order states, permanent logging.",
    detail:
      "A complete Point-of-Sale application built to track transactions, receipts, and order states with permanent logging. Features secure administrative controls alongside detailed history logs and analytical panels.",
    tools: "HTML · CSS · JavaScript · VS Code",
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/raex_ba/?hl=en",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/raekwon-nuevaorlanda-439798363/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "GitHub",
    href: "https://github.com/savin6464",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
];

const CONTACT_EMAIL = "rbs.nuevaorlanda@example.com";
const FULL_NAME = "Raekwon Benedict Nuevaorlanda";

// Konami-style unlock sequences — either works
const SEQ_ARROWS = ["w", "w", "s", "s", "a", "d", "a", "d", "6", "4", "6", "4"];
const SEQ_LETTERS = ["d", "e", "k", "d", "e", "k"];

function BrandIcon({ path, size = 17 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const scrollRef = useRef(null);

  // ---- edit mode (konami) ----
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState("");
  const keyBuffer = useRef([]);

  // ---- editable copy ----
  const [heroBio, setHeroBio] = useState(
    "Student, digital artist, and developer. I split my time between illustration, presentation design, and building small tools — this is a growing gallery of what I've made so far."
  );
  const [editingHero, setEditingHero] = useState(false);
  const [heroDraft, setHeroDraft] = useState(heroBio);

  const [aboutText, setAboutText] = useState(
    "Welcome to my portfolio. I'm a student who works across art and code — drawing characters, designing decks, and building small software tools. This is a simple, growing gallery of what I've made so far."
  );
  const [editingAbout, setEditingAbout] = useState(false);
  const [aboutDraft, setAboutDraft] = useState(aboutText);

  // ---- projects (editable) ----
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const emptyNewProject = { previewUrl: "", type: "image", title: "", tagText: "", description: "" };
  const [newProj, setNewProj] = useState(emptyNewProject);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setActiveProject(null);
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
  }, [activeProject]);

  useEffect(() => {
    const onWindowScroll = () => setScrolled(window.scrollY > 8);
    onWindowScroll();
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, []);

  // konami listener — ignores keystrokes while typing in a field
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName ? e.target.tagName : "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      const key = e.key.toLowerCase();
      const buf = [...keyBuffer.current, key].slice(-12);
      keyBuffer.current = buf;
      const endsWith = (seq) => buf.slice(-seq.length).join(",") === seq.join(",");
      if (endsWith(SEQ_ARROWS) || endsWith(SEQ_LETTERS)) {
        keyBuffer.current = [];
        setEditMode((v) => {
          const next = !v;
          setToast(next ? "Edit mode ON" : "Edit mode OFF");
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPct(max <= 0 ? 0 : (el.scrollLeft / max) * 100);
  };

  const scrollByCard = (dir) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  const submitContact = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const loadFile = (file) => {
    if (!file) return;
    const type = file.type.startsWith("video") ? "video" : "image";
    const url = URL.createObjectURL(file);
    setNewProj((p) => ({ ...p, previewUrl: url, type }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    loadFile(e.dataTransfer.files && e.dataTransfer.files[0]);
  };

  const handleAddProject = () => {
    if (!newProj.title || !newProj.tagText || !newProj.previewUrl) {
      setToast("Add media, a title, and a label first");
      return;
    }
    const proj = {
      id: Date.now(),
      title: newProj.title,
      tag: newProj.tagText,
      type: newProj.type,
      src: newProj.previewUrl,
      blurb: newProj.description.slice(0, 130),
      detail: newProj.description,
      tools: "",
    };
    setProjects((prev) => [...prev, proj]);
    setNewProj(emptyNewProject);
    setShowAddForm(false);
    setToast("Project added");
  };

  const removeProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setActiveProject((cur) => (cur && cur.id === id ? null : cur));
    setToast("Project removed");
  };

  return (
    <div className="rn-portfolio" data-theme={darkMode ? "dark" : "light"}>
      <div className="rn-bg-grain" aria-hidden="true" />
      <div className="rn-bg-pattern" aria-hidden="true" />

      <header className={`rn-topbar${scrolled ? " rn-scrolled" : ""}`}>
        <div className="rn-wrap">
          <nav className="rn-nav">
            <div className="rn-logo">
              <div className="rn-logo-badge rn-mono">
                <span className="rn-logo-mark">RN</span>
                <span className="rn-logo-full">{FULL_NAME}</span>
              </div>
              <span className="rn-logo-name">Raekwon</span>
              {editMode && <span className="rn-edit-badge">EDIT MODE</span>}
            </div>

            <div className="rn-nav-links">
              <button className="rn-nav-link" onClick={() => goTo("about")}>About</button>
              <button className="rn-nav-link" onClick={() => goTo("work")}>Work</button>
              <button className="rn-nav-link" onClick={() => goTo("contact")}>Contact</button>
            </div>

            <div className="rn-nav-right">
              <button className="rn-icon-btn" aria-label="Toggle theme" onClick={() => setDarkMode((v) => !v)}>
                {darkMode ? <SunMedium size={16} /> : <Moon size={16} />}
              </button>
              <button
                className="rn-icon-btn rn-burger"
                aria-label="Open menu"
                aria-expanded={navOpen}
                onClick={() => setNavOpen((v) => !v)}
              >
                {navOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            <div className={`rn-mobile-menu${navOpen ? " open" : ""}`}>
              <button onClick={() => goTo("about")}>About</button>
              <button onClick={() => goTo("work")}>Work</button>
              <button onClick={() => goTo("contact")}>Contact</button>
            </div>
          </nav>
        </div>
      </header>

      <div className="rn-wrap">
        <section className="rn-hero-about">
          <div className="rn-hero-sidebar">
            <span className="rn-mono rn-follow-label">Follow Me</span>
            <div className="rn-sidebar-line" />
            <div className="rn-hero-socials">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="rn-hero-social">
                  <BrandIcon path={s.path} />
                </a>
              ))}
            </div>
          </div>

          <div className="rn-hero-about-left">
            <div className="rn-hero-text">
              <p className="rn-mono rn-hero-eyebrow">PORTFOLIO / 2026</p>
              <h1 className="rn-name">I'm Raekwon</h1>
              <p className="rn-role">I make art, decks &amp; software.</p>

              {editingHero ? (
                <div className="rn-edit-box">
                  <textarea
                    className="rn-edit-textarea"
                    rows={4}
                    value={heroDraft}
                    onChange={(e) => setHeroDraft(e.target.value)}
                  />
                  <div className="rn-edit-actions">
                    <button className="rn-btn rn-btn-solid rn-btn-sm" onClick={() => { setHeroBio(heroDraft); setEditingHero(false); }}>Save</button>
                    <button className="rn-btn rn-btn-sm" onClick={() => { setHeroDraft(heroBio); setEditingHero(false); }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="rn-hero-bio">{heroBio}</p>
              )}

              {editMode && !editingHero && (
                <button className="rn-edit-toggle" onClick={() => { setHeroDraft(heroBio); setEditingHero(true); }}>
                  <Pencil size={13} /> Edit description
                </button>
              )}

              <div className="rn-cta-row">
                <button className="rn-btn" onClick={() => goTo("work")}>My Portfolio</button>
                <button className="rn-btn rn-btn-solid" onClick={() => goTo("contact")}>Contact Me</button>
              </div>
            </div>

            <div className="rn-about-block" id="about">
              <div className="rn-section-head">
                <span className="rn-mono rn-section-num">01</span>
                <h2>About Me</h2>
              </div>
              <div className="rn-about">
                {editingAbout ? (
                  <div className="rn-edit-box">
                    <textarea
                      className="rn-edit-textarea"
                      rows={4}
                      value={aboutDraft}
                      onChange={(e) => setAboutDraft(e.target.value)}
                    />
                    <div className="rn-edit-actions">
                      <button className="rn-btn rn-btn-solid rn-btn-sm" onClick={() => { setAboutText(aboutDraft); setEditingAbout(false); }}>Save</button>
                      <button className="rn-btn rn-btn-sm" onClick={() => { setAboutDraft(aboutText); setEditingAbout(false); }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p>{aboutText}</p>
                )}
                {editMode && !editingAbout && (
                  <button className="rn-edit-toggle" onClick={() => { setAboutDraft(aboutText); setEditingAbout(true); }}>
                    <Pencil size={13} /> Edit description
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="rn-hero-about-right">
            <div className="rn-hero-visual">
              <div className="rn-hero-dot" />
              <img src="/arts_portfolio.jpg" alt="Featured illustration work" />
              <p className="rn-hero-caption rn-mono">Latest illustration work</p>
            </div>
          </div>
        </section>

        <section className="rn-section" id="work">
          <div className="rn-section-head" style={{ justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: ".9rem" }}>
              <span className="rn-mono rn-section-num">02</span>
              <h2>Featured Work</h2>
            </div>
            <div className="rn-nav-btns">
              <button className="rn-nav-btn" aria-label="Scroll left" onClick={() => scrollByCard(-1)}>
                <ChevronLeft size={16} />
              </button>
              <button className="rn-nav-btn" aria-label="Scroll right" onClick={() => scrollByCard(1)}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="rn-scroll" ref={scrollRef} onScroll={handleScroll}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="rn-card"
                tabIndex={0}
                role="button"
                onClick={() => setActiveProject(p)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveProject(p)}
              >
                {editMode && (
                  <button
                    className="rn-card-remove"
                    aria-label={`Remove ${p.title}`}
                    onClick={(e) => { e.stopPropagation(); removeProject(p.id); }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <div className="rn-card-media">
                  {p.type === "video" ? (
                    <video src={p.src} autoPlay loop muted playsInline />
                  ) : (
                    <img src={p.src} alt={p.title} />
                  )}
                </div>
                <div className="rn-card-body">
                  <p className="rn-mono rn-card-index">{`/0${i + 1} • ${p.tag}`}</p>
                  <h3>{p.title}</h3>
                  <p className="rn-card-blurb">{p.blurb}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rn-progress-track">
            <div className="rn-progress-fill" style={{ width: `${scrollPct}%` }} />
          </div>

          {editMode && (
            <div className="rn-add-project-wrap">
              {!showAddForm ? (
                <button className="rn-edit-toggle" onClick={() => setShowAddForm(true)}>
                  <Plus size={13} /> Add project
                </button>
              ) : (
                <div className="rn-add-form">
                  <div
                    className="rn-dropzone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {newProj.previewUrl ? (
                      newProj.type === "video" ? (
                        <video src={newProj.previewUrl} muted loop autoPlay />
                      ) : (
                        <img src={newProj.previewUrl} alt="Preview" />
                      )
                    ) : (
                      <div className="rn-dropzone-hint">
                        <UploadCloud size={20} />
                        <span>Drag &amp; drop an image or video, or click to browse</span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      hidden
                      onChange={(e) => loadFile(e.target.files && e.target.files[0])}
                    />
                  </div>

                  <div className="rn-field">
                    <label htmlFor="rn-proj-title">Title</label>
                    <input
                      id="rn-proj-title"
                      type="text"
                      value={newProj.title}
                      onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                    />
                  </div>

                  <div className="rn-field">
                    <label htmlFor="rn-proj-tag">{`Index label — shown as /0${projects.length + 1} • <your text>`}</label>
                    <input
                      id="rn-proj-tag"
                      type="text"
                      placeholder="e.g. ILLUSTRATION"
                      value={newProj.tagText}
                      onChange={(e) => setNewProj({ ...newProj, tagText: e.target.value })}
                    />
                  </div>

                  <div className="rn-field">
                    <label htmlFor="rn-proj-desc">Description</label>
                    <textarea
                      id="rn-proj-desc"
                      rows={3}
                      value={newProj.description}
                      onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                    />
                  </div>

                  <div className="rn-edit-actions">
                    <button className="rn-btn rn-btn-solid rn-btn-sm" onClick={handleAddProject}>Add to gallery</button>
                    <button className="rn-btn rn-btn-sm" onClick={() => { setNewProj(emptyNewProject); setShowAddForm(false); }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="rn-section" id="contact">
          <div className="rn-section-head">
            <span className="rn-mono rn-section-num">03</span>
            <h2>Contact Me</h2>
          </div>

          <div className="rn-contact-grid">
            <div className="rn-contact-text">
              <p>Have a project, an event deck, or a tool you want built? Send a message and I'll get back to you.</p>
              <a className="rn-contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <div className="rn-contact-socials">
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="rn-social-btn">
                    <BrandIcon path={s.path} />
                  </a>
                ))}
              </div>
            </div>

            <form className="rn-form" onSubmit={submitContact}>
              <div className="rn-form-row">
                <div className="rn-field">
                  <label htmlFor="rn-name">Name</label>
                  <input id="rn-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="rn-field">
                  <label htmlFor="rn-email">Email</label>
                  <input id="rn-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="rn-field">
                <label htmlFor="rn-message">Message</label>
                <textarea id="rn-message" rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="rn-submit">
                Send message <Send size={15} />
              </button>
            </form>
          </div>
        </section>

        <footer className="rn-footer">
          <p>© 2026 raex_ba</p>
        </footer>
      </div>

      <div className={`rn-modal${activeProject ? " active" : ""}`} aria-hidden={!activeProject}>
        <div className="rn-modal-backdrop" onClick={() => setActiveProject(null)} />
        <div className="rn-modal-panel">
          <button className="rn-modal-close" aria-label="Close" onClick={() => setActiveProject(null)}>
            <X size={22} />
          </button>
          {activeProject && (
            <div className="rn-modal-body">
              <div className="rn-modal-media">
                {activeProject.type === "video" ? (
                  <video src={activeProject.src} controls autoPlay loop />
                ) : (
                  <img src={activeProject.src} alt={activeProject.title} />
                )}
              </div>
              <h2>{activeProject.title}</h2>
              <p className="rn-mono rn-modal-tag">{activeProject.tag}</p>
              <p>{activeProject.detail}</p>
              <p className="rn-mono rn-tools">{activeProject.tools}</p>
            </div>
          )}
        </div>
      </div>

      {toast && <div className="rn-toast rn-mono">{toast}</div>}
    </div>
  );
}
