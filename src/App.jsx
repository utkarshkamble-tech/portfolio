import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["home", "about", "skills", "experience", "projects", "contact"];

const SKILLS = [
  { cat: "Frontend", items: [
    { name: "React.js", level: 88 },
    { name: "HTML5 / CSS3", level: 95 },
    { name: "JavaScript (ES6+)", level: 88 },
    { name: "Tailwind CSS", level: 85 },
  ]},
  { cat: "Mobile & CMS", items: [
    { name: "React Native", level: 82 },
    { name: "WordPress", level: 92 },
    { name: "Figma → Code", level: 90 },
    { name: "REST APIs / Laravel", level: 78 },
  ]},
];

const EXPERIENCE = [
  {
    role: "Frontend Developer",
    company: "FUDUGO Solutions",
    period: "April 2023 – Present",
    type: "Full-time",
    points: [
      "Built scalable React.js web apps with pixel-perfect Figma-to-code conversions",
      "Developed cross-platform mobile UI using React Native for Android",
      "Integrated frontend with Laravel backend via REST APIs",
      "Ensured cross-device compatibility and performance optimisation",
      "Collaborated with designers and backend engineers in agile sprints",
    ],
  },
  {
    role: "WordPress Developer",
    company: "Freelance",
    period: "2021 – 2023",
    type: "Freelance",
    points: [
      "Built and customised 10+ WordPress websites for clients across different industries",
      "Created custom themes using PHP, HTML, CSS and JavaScript",
      "Configured WooCommerce stores with payment gateway integration",
      "Optimised websites for SEO and page speed performance",
      "Managed hosting, domain setup and ongoing client support",
    ],
  },
];

const PROJECTS = [
  { name: "Defiant Health", desc: "Responsive healthcare platform with appointment-ready UI, accessibility best practices, and clean component architecture.", tags: ["React.js", "REST API", "CSS3"], live: "https://defianthealth.com", year: "2024" },
  { name: "360 Enablement", desc: "Corporate business website with structured layout, smooth navigation and performance-optimised asset delivery.", tags: ["React.js", "Figma", "Responsive"], live: "https://360enablement.com", year: "2024" },
  { name: "Dr. Gambhir Portal", desc: "Medical practice portal with doctor profiles, services showcase and fully responsive mobile-first design.", tags: ["HTML5", "CSS3", "JavaScript"], live: "#", year: "2023" },
  { name: "Aesthetics & Wellness", desc: "Luxury beauty brand UI with elegant design system, micro-interactions and strong UX focus that converts visitors.", tags: ["React.js", "Tailwind", "Figma"], live: "#", year: "2023" },
  { name: "React Native App", desc: "Cross-platform mobile application with smooth animations, clean UI patterns and seamless Android performance.", tags: ["React Native", "Android", "REST API"], live: "#", year: "2024" },
  { name: "WooCommerce Store", desc: "Full e-commerce WordPress store with custom theme, WooCommerce setup and payment gateway integration.", tags: ["WordPress", "WooCommerce", "PHP"], live: "#", year: "2022" },
];

const TOOLS = ["React.js", "React Native", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "WordPress", "WooCommerce", "PHP", "Laravel", "Figma", "Git / GitHub", "VS Code", ];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 160) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────
function SkillBar({ name, level, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className="skill-item">
      <div className="skill-row">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: visible ? `${level}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Navbar() {
  const active = useScrollSpy(NAV_LINKS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <button className="nav-logo" onClick={() => scrollTo("home")}>UK</button>

        <ul className="nav-links">
          {NAV_LINKS.map(id => (
            <li key={id}>
              <button
                className={`nav-link${active === id ? " active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {id}
              </button>
            </li>
          ))}
        </ul>

        <a href="https://wa.me/918007445735" target="_blank" rel="noreferrer" className="nav-cta">
          Hire Me
        </a>

        <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {NAV_LINKS.map(id => (
          <button key={id} className="mobile-link" onClick={() => { scrollTo(id); setMenuOpen(false); }}>
            {id}
          </button>
        ))}
        <a href="https://wa.me/919834005839" target="_blank" rel="noreferrer" className="mobile-cta">
          Hire Me ↗
        </a>
      </div>
    </>
  );
}

// ─── SCROLL DOTS ──────────────────────────────────────────────────────────────
function ScrollDots() {
  const active = useScrollSpy(NAV_LINKS);
  return (
    <div className="scroll-dots">
      {NAV_LINKS.map(id => (
        <button
          key={id}
          className={`scroll-dot${active === id ? " active" : ""}`}
          onClick={() => scrollTo(id)}
          title={id}
        />
      ))}
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="container">
      <section id="home" className="hero">
        <div className="hero-bg-text" aria-hidden="true">DEVELOPER</div>

        <div className="hero-content">
          <p className="hero-tag">Frontend &amp; React Native Developer</p>

          <h1 className="hero-name">
            <span className="hero-name-white">Utkarsh</span>
            <br />
            <span className="hero-name-red">Kamble</span>
          </h1>

          <p className="hero-desc">
            I craft <em>pixel-perfect</em> web &amp; mobile experiences that convert
            visitors into customers. 3.5+ years building products people love.
          </p>

          <div className="hero-btns">
            <a
              href="https://wa.me/918007445735"
              target="_blank" rel="noreferrer"
              className="btn-primary"
            >
              💬 Hire Me on WhatsApp
            </a>
            <a href="/resume.docx" download className="btn-outline">
              📄 Download Resume
            </a>
          </div>

          <div className="hero-stats">
            {[["3.5+", "Years Exp"], ["5+", "Projects"], ["100%", "Satisfaction"]].map(([n, l]) => (
              <div key={l} className="stat">
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-photo-frame">
            <div className="hero-photo">
              <img src="/my.png" alt="Utkarsh Kamble" />
              <div className="photo-overlay" />
            </div>
            <div className="frame-tl" />
            <div className="frame-br" />
            <div className="hero-badge">✦ Open to Work</div>
            <div className="hero-line-deco" />
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>scroll</span>
          <div className="scroll-bar" />
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const [ref, visible] = useReveal();
  return (
    <section id="about" className="about-sec">
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">Who I am</p>
          <h2 className="sec-title">About Me</h2>
        </div>

        <div ref={ref} className={`about-grid${visible ? " visible" : ""}`}>
          <div className="about-left">
            <div className="about-img">
              <img src="/about.png" alt="Utkarsh" />
              <div className="about-badge">
                <div className="about-badge-num">3.5+</div>
                <div className="about-badge-lbl">Years of<br />Experience</div>
              </div>
            </div>
          </div>

          <div className="about-text">
            <h3 className="about-greeting">Hey, I'm Utkarsh 👋</h3>
            <p>
              A Frontend &amp; React Native Developer from{" "}
              <em>Nagpur, India</em> who is obsessed with turning complex Figma
              designs into clean, responsive, and blazing-fast interfaces.
            </p>
            <p>
              I started with <em>WordPress</em> — spending 2 years building
              custom themes, WooCommerce stores and client sites. Then I
              transitioned into <em>React.js, React Native &amp; Laravel</em>{" "}
              where I've spent the last 1.5 years shipping real products.
            </p>
            <p>
              Currently at <em>FUDUGO Solutions</em> where I've shipped
              healthcare platforms, business portals, medical websites, and
              mobile apps — all from scratch.
            </p>
            <div className="about-tags">
              {["📍 Nagpur, India", "💼 3.5 Yrs Exp", "⚡ Fast Delivery", "🎨 Figma Expert", "🔧 WordPress Pro"].map(t => (
                <span key={t} className="about-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="skills-sec">
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">What I work with</p>
          <h2 className="sec-title">Skills</h2>
        </div>

        <div className="skills-grid">
          {SKILLS.map((group, gi) => (
            <div key={group.cat} className="skill-group">
              <p className="skill-cat-label">{group.cat}</p>
              {group.items.map((s, si) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={gi * 100 + si * 80} />
              ))}
            </div>
          ))}
        </div>

        <div className="tools-strip">
          <p className="tools-label">Tools &amp; Technologies</p>
          <div className="tools-list">
            {TOOLS.map(t => <span key={t} className="tool-pill">{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="exp-sec">
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">My journey</p>
          <h2 className="sec-title">Experience</h2>
        </div>

        <div className="exp-list">
          {EXPERIENCE.map((exp, i) => {
            const [ref, visible] = useReveal();
            return (
              <div
                key={i}
                ref={ref}
                className={`exp-card${visible ? " visible" : ""}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="exp-card-left">
                  <span className="exp-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="exp-type-badge">{exp.type}</span>
                </div>
                <div className="exp-card-body">
                  <div className="exp-header">
                    <div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <p className="exp-company">@ {exp.company}</p>
                    </div>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <ul className="exp-points">
                    {exp.points.map((pt, j) => (
                      <li key={j}><span className="exp-bullet">→</span>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="projects-sec">
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">Selected work</p>
          <h2 className="sec-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => {
            const [ref, visible] = useReveal();
            return (
              <div
                key={p.name}
                ref={ref}
                className={`project-card${visible ? " visible" : ""}`}
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="project-top-bar" />
                <span className="project-year">{p.year}</span>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
                <div className="project-links">
                  {p.live !== "#" ? (
                    <a href={p.live} target="_blank" rel="noreferrer" className="project-link-btn primary">
                      ↗ Live Demo
                    </a>
                  ) : (
                    <span className="project-link-btn disabled">Private Project</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    // Connect your EmailJS / formspree here
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  }

  return (
    <section id="contact" className="contact-sec">
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">Let's work together</p>
          <h2 className="sec-title">Contact</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-headline">
              Let's build something <span>extraordinary</span>
            </h3>
            <p className="contact-sub">
              Have a project? Want to hire me? Or just want to say hello?
              I respond within 24 hours — let's make something great together.
            </p>

            <div className="contact-items">
              {[
                { icon: "✉", label: "Email", value: "Utk0210@gmail.com", href: "mailto:Utk0210@gmail.com" },
                { icon: "📞", label: "Phone", value: "+91 9834005839", href: "tel:+919834005839" },
                { icon: "💬", label: "WhatsApp", value: "Message directly", href: "https://wa.me/918007445735" },
                { icon: "📍", label: "Location", value: "Nagpur, Maharashtra", href: null },
              ].map(item => (
                <div key={item.label} className="contact-item">
                  <div className="ci-icon">{item.icon}</div>
                  <div>
                    <p className="ci-label">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="ci-value">{item.value}</a>
                      : <p className="ci-value">{item.value}</p>}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/918007445735"
              target="_blank" rel="noreferrer"
              className="btn-primary"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input id="name" name="name" type="text" placeholder="Rahul Sharma" required value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" placeholder="rahul@example.com" required value={form.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Hi Utkarsh, I have a project in mind..." required value={form.message} onChange={handleChange} />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className={`btn-primary submit-btn${status === "sent" ? " sent" : ""}`}
            >
              {status === "sending" ? "⏳ Sending..." : status === "sent" ? "✅ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo">UK</span>
      <p className="footer-text">
        Crafted with ❤️ by <strong>Utkarsh Kamble</strong> · React + Vite + Tailwind
      </p>
      <p className="footer-copy">© {new Date().getFullYear()} All rights reserved</p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <ScrollDots />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}