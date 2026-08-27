'use client';

import { useEffect } from 'react';

const skills = [
  { title: 'Backend & data', items: 'Python, FastAPI, Flask, SQL, MySQL, DuckDB, REST APIs, ETL/ELT' },
  { title: 'AI & machine learning', items: 'LLM agents, RAG, embeddings, FAISS, PyTorch, LightGBM, evaluation' },
  { title: 'Systems & cloud', items: 'Docker, Airflow, AWS, GCP Cloud Run, Linux, Git, scheduled jobs, data quality' },
  { title: 'Product & reporting', items: 'PHP, Laravel, JavaScript, HTML, PowerBI, Streamlit, stakeholder delivery' },
];

const experience = [
  {
    period: 'Jan 2026 — Aug 2026',
    role: 'Data & Software Consultant',
    company: 'TOPC potentia',
    bullets: [
        'Tax-provision and accounting application (Flask/MySQL, ~1,000 monthly active users), deployed in Docker on AWS EC2 with SQLAlchemy and Alembic migrations, shipped through GitHub Actions, with correlation IDs and structured logging for tracing production failures.',
        'Project management and budgeting application, where I built the time-tracking module, added automated alerts on overdue tasks, and layered analysis on top of the time data.',
    ],
    tags: ['Docker', 'Flask', 'AWS', 'CI/CD', 'Unit Testing'],
  },
  {
    period: 'Jan 2024 — Aug 2025',
    role: 'AGI Developer | Data Scientist III',
    company: 'Turing',
    bullets: [
        'Built a Python/SQL platform over ~6M FMCSA/DOT carrier records to surface high-value commercial carriers, combining a daily census feed with monthly inspection, violation and crash data in Airflow, gating rebuilds behind per-source watermarks.',
        'Built a provider-agnostic LLM enrichment layer (LiteLLM, Tavily) that gathers web and document evidence to qualify candidate carriers, with capped fan-out per entity for predictable cost and evidence stored separately from scoring; ranked ~100K high-confidence leads across deterministic, vector-similarity and LLM-judgment strategies.',
        'Integrated QuickBooks Online into a Laravel/MySQL application so users create accounting records without leaving it: OAuth2 consent flow, persisted refresh-token rotation with proactive refresh.',
        'Designed the review methodology for a 25-person team, splitting agent evaluation into five dimensions (task definition, gold trajectory, instruction following, user simulation, verifier robustness) so a failure could be attributed to its cause rather than recorded as a generic fail.',
        'Built an incremental sync pulling ~100K invoices, expenses and chart-of-accounts records from the QuickBooks API into a local analytical database, handling pagination, rate limits, retry with backoff and duplicate-safe upserts, so Power BI reporting queried a database instead of a rate-limited API.',
    ],
    tags: ['Python', 'LLM agents', 'Flask', 'RAG', 'Data Engineering'],
  },
  {
    period: 'Apr 2022 — Dec 2023',
    role: 'Data Scientist',
    company: 'Turing',
    bullets: [
        'Fine-tuned a BERT model to embed developer profiles and job requirements, improving the relevance of top-ranked matches; deployed with FastAPI and Docker.',
        'Ran A/B tests and experiment analysis with cross-functional teams, validating outcomes with t-tests and ANOVA and translating results into recommendations for product owners; contributed to a 25% lift in product satisfaction.',
        'Built Power BI financial reporting for client stakeholders covering P&L, balance sheet, inventory aging and payment maturity, owned from source extraction through the relational model to the report logic.',
        'Handled ad hoc analytical requests from client and internal stakeholders, turning ambiguous questions into defined, measurable metrics before answering them.',
        'Migrated ~500K time entries, 100K invoices and 100K expenses from Harvest into a custom relational schema, reconstructing relationships the CSV exports omitted via a staging layer, synthetic IDs and dependency-ordered inserts, with per-row source lineage and monthly count and monetary reconciliation before cutover.',
    ],
    tags: ['Data science', 'ML evaluation', 'Pipelines', 'Data Visualization'],
  },
  {
    period: 'Jul 2020 — Apr 2022',
    role: 'Data Scientist',
    company: 'Afiniti',
    bullets: [
            'Built XGBoost propensity models driving real-time customer-to-agent pairing in production, improving the target gain metric by 12% and agent utilisation by 25%.',
            'Account lead across client portfolios worth over $20M, presenting model results and recommendations directly to management and client-side stakeholders.',
            'Statistically validated predicted against realised performance in live client environments, and monitored deployed models for degradation with root-cause analysis when the two diverged.',
            'Built interactive Power BI and Tableau dashboards on Dataverse data models, giving stakeholders the reporting they used for day-to-day decisions.',
            'Optimised reporting pipelines with advanced SQL (window functions, CTEs), cutting query runtime and ensuring accurate KPI reporting.',
    ],
    tags: ['LightGBM', 'Python', 'Monitoring', 'Predictive Analysis', 'Data Analysis'],
  },
];

const projects = [
  {
    id: '01',
    title: 'FMCSA Carrier Intelligence Pipeline & AI Enrichment',
    stack: 'Python · SQL · DuckDB · FAISS · LiteLLM',
    summary: 'An incremental, multi-source pipeline operating at multi-million-record scale, with evidence-gathering agents and explainable entity ranking.',
    details: ['Watermarks & set-based upserts', 'Schema-drift logging', 'OpenAI · Claude · Gemini', 'Source provenance'],
    link: '',
  },
  {
    id: '02',
    title: 'QuickBooks Data & Backend Integration',
    stack: 'PHP/Laravel · MySQL · REST APIs · AWS',
    summary: 'OAuth2-backed financial data syncs and reporting datasets spanning customers, invoices, ledgers, products, and financial summaries.',
    details: ['Token refresh', 'Scheduled syncs', 'AR aging', 'Power BI outputs'],
    link: '',
  },
    {
    id: '03',
    title: 'Sports RAG Chatbot',
    stack: 'Sentence Transformers · FAISS · Mistral 7B · Streamlit',
    summary: 'Retrieval-augmented Q&A over scraped sports data, running end to end on an 8 GB CPU-only machine.',
    details: ['Vector retrieval', 'Quantized local model', 'LLM-as-judge evaluation', 'Hugging Face serving'],
    link: 'https://the-sport-chatbot.streamlit.app/',
  },
  {
    id: '04',
    title: 'Agent Evaluation Framework & Failure Taxonomy',
    stack: 'LLM agents · Evaluation design',
    summary: 'A five-dimension framework for judging tool-using agents, and a taxonomy separating five distinct classes of tool-use hallucination.',
    details: ['Gold trajectories', 'Verifier robustness', 'User simulation', 'Failure attribution'],
    link: '',
  },
  {
    id: '05',
    title: 'Legacy Migration with Lineage & Reconciliation',
    stack: 'Python · SQL · MySQL',
    summary: 'Migrated 700K time, invoice and expense records into a new relational schema, reconstructing relationships the source exports omitted.',
    details: ['Staging & synthetic IDs', 'Dependency-ordered load', 'Per-row source lineage', 'Monthly reconciliation'],
    link: '',
  },
  {
    id: '06',
    title: 'MindMap Agent Application',
    stack: 'Python · PHP · AI agents',
    summary: 'An agent-based application connecting a PHP interface to a Python backend with multiple coordinated agent types and AI workflows.',
    details: ['Agent orchestration', 'Python backend', 'PHP interface', 'AI workflows'],
    link: '',
  },
];

export default function Home() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--px', `${(event.clientX / innerWidth - 0.5) * 2}`);
      document.documentElement.style.setProperty('--py', `${(event.clientY / innerHeight - 0.5) * 2}`);
    };
    addEventListener('pointermove', onMove);
    return () => removeEventListener('pointermove', onMove);
  }, []);

  return (
    <main id="top">
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="monogram" href="#top">MU<span>/</span>01</a>
        <div className="nav-links"><a href="#profile">Intro</a><a href="#experience">Experience</a><a href="#projects">Projects</a></div>
        <a className="nav-cta" href="#contact"><i /> Contact</a>
      </nav>

      <header className="hero shell">
        <div className="hero-main">
          <p className="overline">PYTHON · DATA ENGINEERING · AI/ML · BACKEND SYSTEMS</p>
          <h1>Muhammad <strong className="follow-text" data-text="Usman.">Usman.</strong></h1>
          <div className="hero-meta"><span>Nürnberg, Germany</span><span>MSc ICT, FAU · Expected Jun 2027</span></div>
          <div className="hero-actions"><a href="#experience">Experience ↓</a><a href="./Usman_AIDAR_CV.docx" download>Download CV ↗</a></div>
        </div>
        <div className="hero-portrait">
          {/* A relative native image URL works locally and under the /usman GitHub Pages path. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="./usman-image.jpg" alt="Muhammad Usman" width="600" height="600" fetchPriority="high" />
        </div>
      </header>

      <section className="profile shell section" id="profile">
        <div className="section-label"><span>01</span> Intro</div>
        <p className="intro">
          Data scientist, 5+ years across production ML, analytics and data engineering. I work the whole path: the pipeline that moves the data, the model that uses it, and the reporting people make decisions from. Most of it client-facing, where the constraint is usually not the algorithm but what the data supports and what the stakeholder will trust.
          Strongest in Python, SQL and Airflow, and comfortable in the backend and API layer that surrounds them. Recent work on LLM and agent systems, including evaluation methodology for tool-using agents.
        </p>
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
        <div className="project-list">{projects.map((project) => <article className={`project${project.link ? ' has-link' : ''}`} key={project.id}>
          <span className="project-id">{project.id}</span>
          <div className="project-main"><p className="project-stack">{project.stack}</p><h3>{project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a> : project.title}</h3><p>{project.summary}</p></div>
          <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          {project.link ? <a className="project-arrow" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>↗</a> : null}
        </article>)}</div>
      </section>

      <section className="education shell section">
        <div className="section-label"><span>05</span> Education</div>
        <div className="education-grid">
          <article><time>Expected Jun 2027</time><h3>MSc Information and Communication Technology</h3><p>FAU Erlangen-Nürnberg · Germany</p></article>
          <article><time>2016 — 2020</time><h3>BS Electrical Engineering & Computer Science</h3><p>LUMS · Pakistan · Dean&apos;s Honour List · 3 years</p></article>
        </div>
      </section>

      <footer id="contact"><div className="shell footer-content">
        <div><p className="overline">CONTACT</p><h2>Muhammad Usman</h2><p>Nürnberg, Germany</p></div>
        <div className="contact-links"><a href="mailto:Muhammad.usman@fau.de">Muhammad.usman@fau.de ↗</a><a href="https://linkedin.com/in/usman174" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/20100190" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="./Usman_AIDAR_CV.docx" download>Download CV ↓</a></div>
        <div className="footer-meta"><span>© 2026 Muhammad Usman</span><span>Nürnberg, Germany</span><a href="#top">Back to top ↑</a></div>
      </div></footer>
    </main>
  );
}
