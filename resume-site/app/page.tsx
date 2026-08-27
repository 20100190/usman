'use client';

import { useEffect, useRef } from 'react';

const skills = [
  { title: 'Backend & data', items: 'Python, FastAPI, Flask, SQL, MySQL, DuckDB, REST APIs, ETL/ELT' },
  { title: 'AI & machine learning', items: 'LLM agents, RAG, embeddings, FAISS, PyTorch, LightGBM, evaluation' },
  { title: 'Systems & cloud', items: 'Docker, AWS, GCP Cloud Run, Linux, Git, scheduled jobs, data quality' },
  { title: 'Product & reporting', items: 'PHP, Laravel, JavaScript, HTML, Power BI, Streamlit, stakeholder delivery' },
];

const experience = [
  {
    period: 'Jan 2024 — Jun 2025',
    role: 'AGI Developer / Engineer',
    company: 'Turing',
    bullets: [
      'Built and evaluated LLM applications and agent workflows using tool calls, retrieval, structured outputs, and quality-focused evaluation.',
      'Developed Python services and data workflows, including a Flask-based tax provision application and processing automation.',
      'Translated ambiguous business requirements into implementable backend and AI systems.',
    ],
    tags: ['Python', 'LLM agents', 'Flask', 'RAG'],
  },
  {
    period: 'Apr 2022 — Dec 2023',
    role: 'Data Scientist',
    company: 'Turing',
    bullets: [
      'Led and reviewed AI and data engineering work while remaining hands-on with analysis, model evaluation, and workflow design.',
      'Built production-oriented statistical and ML solutions and supported data pipelines, monitoring, and operational reporting.',
    ],
    tags: ['Data science', 'ML evaluation', 'Pipelines'],
  },
  {
    period: 'Jun 2020 — Apr 2022',
    role: 'Data Scientist',
    company: 'Afiniti',
    bullets: [
      'Built and deployed propensity models for European accounts with Python and LightGBM, improving the target gain metric by approximately 12%.',
      'Worked with production datasets and model monitoring across routing performance and data-drift analysis.',
    ],
    tags: ['LightGBM', 'Python', 'Monitoring'],
  },
];

const projects = [
  {
    id: '01',
    title: 'FMCSA Carrier Intelligence Pipeline & AI Enrichment',
    stack: 'Python · SQL · DuckDB · FAISS · LiteLLM',
    summary: 'An incremental, multi-source pipeline operating at multi-million-record scale, with evidence-gathering agents and explainable entity ranking.',
    details: ['Watermarks & set-based upserts', 'Schema-drift logging', 'OpenAI · Claude · Gemini', 'Source provenance'],
  },
  {
    id: '02',
    title: 'QuickBooks Data & Backend Integration',
    stack: 'PHP/Laravel · MySQL · REST APIs · AWS',
    summary: 'OAuth2-backed financial data syncs and reporting datasets spanning customers, invoices, ledgers, products, and financial summaries.',
    details: ['Token refresh', 'Scheduled syncs', 'AR aging', 'Power BI outputs'],
  },
  {
    id: '03',
    title: 'MindMap Agent Application',
    stack: 'Python · PHP · AI agents',
    summary: 'An agent-based application connecting a PHP interface to a Python backend with multiple coordinated agent types and AI workflows.',
    details: ['Agent orchestration', 'Python backend', 'PHP interface', 'AI workflows'],
  },
];

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let targetX = innerWidth / 2;
    let targetY = innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      document.documentElement.style.setProperty('--px', `${(event.clientX / innerWidth - 0.5) * 2}`);
      document.documentElement.style.setProperty('--py', `${(event.clientY / innerHeight - 0.5) * 2}`);
      cursorRef.current?.classList.add('visible');
    };
    const render = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(render);
    };
    addEventListener('pointermove', onMove);
    frame = requestAnimationFrame(render);
    return () => { removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <main id="top">
      <div className="cursor-label" ref={cursorRef} aria-hidden="true">PYTHON · DATA · AI</div>

      <nav className="nav shell" aria-label="Primary navigation">
        <a className="monogram" href="#top">MU<span>/</span>01</a>
        <div className="nav-links"><a href="#profile">Profile</a><a href="#experience">Experience</a><a href="#projects">Projects</a></div>
        <a className="nav-cta" href="mailto:Muhammad.usman@fau.de"><i /> Contact</a>
      </nav>

      <header className="hero shell">
        <div className="hero-main">
          <p className="overline">PYTHON · DATA ENGINEERING · AI/ML · BACKEND SYSTEMS</p>
          <h1>Muhammad <strong className="follow-text" data-text="Usman.">Usman.</strong></h1>
          <div className="hero-meta"><span>Nürnberg, Germany</span><span>MSc ICT, FAU · Expected Jun 2027</span></div>
          <div className="hero-actions"><a href="#experience">Experience ↓</a><a href="/Usman_AIDAR_CV.docx" download>Download CV ↗</a></div>
        </div>
        <div className="signal signal-a" aria-hidden="true" />
      </header>

      <section className="profile shell section" id="profile">
        <div className="section-label"><span>01</span> Intro</div>
        <p className="intro">Python-focused engineer and data scientist with experience building production data pipelines, backend applications, AI/LLM workflows, and data-intensive products. Comfortable owning open-ended problems from data ingestion and APIs through deployment and operational reporting. Strong SQL and relational-database background, hands-on cloud and Docker experience, and recent work with LLM agents, retrieval, structured outputs, and evidence-based ranking.</p>
      </section>

      <section className="skills shell section" id="skills">
        <div className="section-label"><span>02</span> Toolkit</div>
        <div className="skill-grid">{skills.map((skill) => <article key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></article>)}</div>
      </section>

      <section className="experience section" id="experience"><div className="shell">
        <div className="section-label light"><span>03</span> Experience</div>
        <div className="experience-list">{experience.map((item) => <article className="job" key={item.period}>
          <header><time>{item.period}</time><div><h3>{item.role}</h3><p>{item.company}</p></div></header>
          <ul className="job-bullets">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          <div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </article>)}</div>
      </div></section>

      <section className="projects shell section" id="projects">
        <div className="section-label"><span>04</span> Selected projects</div>
        <div className="project-list">{projects.map((project) => <article className="project" key={project.id}>
          <span className="project-id">{project.id}</span>
          <div className="project-main"><p className="project-stack">{project.stack}</p><h3>{project.title}</h3><p>{project.summary}</p></div>
          <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          <span className="project-arrow" aria-hidden="true">↗</span>
        </article>)}</div>
      </section>

      <section className="education shell section">
        <div className="section-label"><span>05</span> Education</div>
        <div className="education-grid">
          <article><time>Expected Jun 2027</time><h3>MSc Information and Communication Technology</h3><p>FAU Erlangen-Nürnberg · Germany</p></article>
          <article><time>2016 — 2020</time><h3>BS Electrical Engineering</h3><p>LUMS · Pakistan</p></article>
        </div>
      </section>

      <footer id="contact"><div className="shell footer-content">
        <div><p className="overline">CONTACT</p><h2>Muhammad Usman</h2><p>Nürnberg, Germany</p></div>
        <div className="contact-links"><a href="mailto:Muhammad.usman@fau.de">Muhammad.usman@fau.de ↗</a><a href="https://linkedin.com/in/usman174" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/Usman_AIDAR_CV.docx" download>Download CV ↓</a></div>
        <div className="footer-meta"><span>© 2026 Muhammad Usman</span><span>Nürnberg, Germany</span><a href="#top">Back to top ↑</a></div>
      </div></footer>
    </main>
  );
}
