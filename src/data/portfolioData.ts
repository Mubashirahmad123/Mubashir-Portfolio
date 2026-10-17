import { Project, ExperienceItem, FreelanceService } from '../types';

export const PERSONAL_INFO = {
  name: 'Mubashir Nazir',
  title: 'Full Stack & Freelance Software Engineer',
  email: 'mubashirahmad0305@gmail.com',
  phone: '+91-9622907883',
  location: 'Srinagar, J&K, India',
  education: {
    institution: 'University of Kashmir',
    degree: 'B.Tech in Mechanical Engineering',
    period: 'Aug 2019 – Dec 2023',
    location: 'Srinagar, J&K, India'
  },
  socials: {
    github: 'https://github.com/Mubashirahmad123',
    githubUsername: 'Mubashirahmad123',
    linkedin: 'https://linkedin.com/in/mubashir-ahmad-13027523b',
    email: 'mailto:mubashirahmad0305@gmail.com',
  },
  bio: 'Full Stack Software Engineer specializing in scalable backend systems, autonomous AI agent pipelines, and high-performance web applications. Experienced in architecting logistics microservices at FastBeetle (PhonePe payments, automated routing, 70% latency cut) and building multi-board automated scraping pipelines with CrewAI and Gemini.',
  keyStats: [
    { label: 'Avg Dashboard Load Time', value: '-70%', change: 'Query & cache optimization' },
    { label: 'Manual Effort Reduced', value: '90%', change: 'Bulk PinZone automation' },
    { label: 'Job Sources Scraped', value: '45+ Boards', change: 'Playwright, APIs & Crawl4AI' },
    { label: 'Automated Test Suite', value: '1,042 Tests', change: 'Pytest + 68 E2E verified' },
  ]
};

export const FREELANCE_SERVICES: FreelanceService[] = [
  {
    title: 'Autonomous AI Agents & Workflows',
    description: 'Custom multi-agent systems using CrewAI, Gemini 2.5 Flash, and LangChain with 5-tier LLM fallback resilience (Gemini → Groq → Mistral → GLM → Ollama).',
    iconName: 'Cpu',
    deliverables: ['Autonomous multi-agent pipelines', 'Multi-source scrapers (Playwright/Crawl4AI)', 'Google Sheets & CRM bi-directional sync', 'Dockerized background schedulers'],
    timeline: '1 – 3 Weeks'
  },
  {
    title: 'Full-Stack Web & SaaS Platforms',
    description: 'End-to-end production web applications with React 19, TypeScript, Node.js, Express, and modern responsive interfaces.',
    iconName: 'Layers',
    deliverables: ['Custom merchant & customer portals', 'Role-based auth (JWT + Passport.js)', 'Optimistic UI state with Redux Toolkit', 'PostgreSQL / Supabase integration'],
    timeline: '2 – 4 Weeks'
  },
  {
    title: 'Backend Performance & Payments',
    description: 'Architecting high-throughput microservices, cutting database bottlenecks, and integrating PhonePe payment gateways & communication systems.',
    iconName: 'Server',
    deliverables: ['PhonePe & Stripe payment gateways', 'In-app communication & SMS dispatch', 'PostgreSQL index tuning & Redis caching', 'Sub-100ms API endpoints'],
    timeline: '1 – 2 Weeks'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'remote-job-agent',
    title: 'Remote Job Agent & AI Automation',
    subtitle: '45+ Job Boards Scraper, 5-Tier LLM Fallback (Gemini/Groq), ATS Resume Engine',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    description: 'An automated multi-source system scraping 45+ remote job portals using APIs, Playwright stealth, and Crawl4AI. Automatically matches postings against candidate CVs using FAISS semantic embeddings, executes a 5-tier LLM fallback cascade (Gemini 2.5 Flash → Groq → Mistral), and generates ATS-optimized 1-page resumes and tailored cover letters with bi-directional Google Sheets sync. Verified by 1,042 pytest and 68 E2E tests.',
    imageUrl: '/src/assets/images/remote_job_agent_ui_1792235323300.jpg',
    metrics: [
      { label: 'Job Sources', value: '45+ Boards' },
      { label: 'LLM Fallback', value: '5-Tier Cascade' },
      { label: 'Matching Logic', value: 'FAISS + Keyword' },
      { label: 'Test Suite', value: '1,042 Passed' },
    ],
    tags: ['Python 3.11', 'CrewAI', 'Gemini 2.5 Flash', 'Playwright Stealth', 'Crawl4AI', 'FAISS', 'FastAPI', 'Docker', 'Google Sheets API'],
    githubUrl: 'https://github.com/Mubashirahmad123/remote-job-agent',
    featured: true,
    hasSimulator: true,
    simulatorType: 'crewai',
    architecture: {
      overview: 'Resilient multi-agent pipeline with decoupled extraction (APIs + Playwright + Crawl4AI), 5-tier LLM fallback chain (Gemini 2.5 Flash → Groq gpt-oss-120b → Mistral → GLM → Ollama), FAISS semantic vector scoring, and FastAPI Command Center dashboard.',
      diagram: `[45+ Remote Job Boards (Remotive, RemoteOK, JobSpy, WeWorkRemotely, Crawl4AI)]
       │
       ▼
[Multi-Source Scraper Agent (Playwright Stealth + Crawl4AI + APIs)]
  ├── MD5 URL & Job Fingerprinting (Deduplication engine)
  └── Country Filter (198 whitelisted terms) -> Normalized JSON Cache
       │
       ▼
[Curator Agent & Multi-CV Matcher]
  ├── Local Keyword Scoring + Optional FAISS Semantic Cosine Reranking
  ├── Multi-CV Directory: Picks optimal CV variant per job
  └── Auto-sync to Google Sheets (5 tabs: ALL, TOP ≥85, GOOD 70-84, APPLIED, STATS)
       │
       ▼
[ATS Document Engine with 5-Tier LLM Fallback Chain]
  ├── Chain: Gemini 2.5 Flash ──► Groq ──► Mistral ──► GLM ──► Ollama Cloud
  ├── Tailored 1-Page ATS Resume PDF (3-Pass Shrink Fit Layout Engine)
  └── Role-Aware Cover Letter (Tailors tone for backend/frontend/fullstack)
       │
       ▼
[FastAPI Backend + Command Center UI + Docker Stack (Oracle Cloud Always Free)]`,
      keyDecisions: [
        'Built a 5-tier LLM fallback chain so pipeline never crashes from quota limits (Gemini 2.5 Flash -> Groq -> Mistral -> GLM -> Ollama).',
        'Engineered a 3-pass shrink-fit PDF engine guaranteeing exact 1-page ATS resumes with hanging-indent bullets verified via pdfplumber.',
        'Employed Playwright stealth and isolated spawn processes for JobSpy to prevent bot-blocks across 10 JS-rendered job boards.',
        'Wrote 1,042 unit/integration tests in pytest and 68 frontend E2E tests, verifying native x86-64 and ARM64 Docker execution.'
      ],
      techStack: [
        { category: 'AI & Orchestration', items: ['CrewAI', 'Gemini 2.5 Flash', 'Groq (gpt-oss-120b)', 'Mistral', 'FAISS Vector Search'] },
        { category: 'Scraping & Automation', items: ['Playwright Stealth', 'Crawl4AI', 'JobSpy', 'APScheduler', 'Python 3.11'] },
        { category: 'Backend & Deploy', items: ['FastAPI', 'Google Sheets API v4', 'Docker Compose', 'Oracle Cloud Always Free'] }
      ],
      codeSnippets: [
        {
          filename: 'agents/gemini_tools.py',
          language: 'python',
          description: '5-tier LLM fallback chain: Gemini -> Groq -> Mistral -> GLM -> Ollama',
          code: `def call_llm_with_fallback(prompt: str, max_retries: int = 3) -> str:
    """Executes 5-tier LLM fallback chain: Gemini -> Groq -> Mistral -> GLM -> Ollama."""
    models_chain = [
        ('gemini', 'gemini-2.5-flash', os.getenv('GEMINI_API_KEY')),
        ('groq', 'openai/gpt-oss-120b', os.getenv('GROQ_API_KEY')),
        ('mistral', 'mistral-medium-latest', os.getenv('MISTRAL_API_KEY')),
        ('glm', 'glm-4', os.getenv('GLM_API_KEY')),
        ('ollama', 'gpt-oss:120b', os.getenv('OLLAMA_API_KEY'))
    ]
    
    for provider, model_name, api_key in models_chain:
        if not api_key:
            continue
        try:
            return execute_llm_provider(provider, model_name, api_key, prompt)
        except Exception as err:
            logger.warning(f"Provider {provider} failed: {err}. Cascading to next fallback...")
            continue
            
    raise RuntimeError("All 5 LLM fallback providers exhausted.")`
        },
        {
          filename: 'tools/resume_generator.py',
          language: 'python',
          description: 'ATS 1-page resume shrink-fit engine verified via pdfplumber',
          code: `def render_ats_single_page_resume(cv_data: dict, job_target: dict) -> bytes:
    """Guarantees strictly 1-page PDF using iterative font spacing adjustments."""
    for pass_num in range(3):
        pdf = UnicodePDF(margin=18 - (pass_num * 2))
        pdf.render_header(cv_data['name'], cv_data['contact'])
        pdf.render_skills(job_target['matched_skills'])
        pdf.render_experience(cv_data['experience'])
        pdf.render_projects(cv_data['projects'])
        
        page_count = pdf.get_page_count()
        if page_count == 1:
            return pdf.output_bytes()
        pdf.tighten_leading(factor=0.92)
        
    return pdf.output_bytes()`
        }
      ]
    }
  },
  {
    id: 'fastbeetle-logistics',
    title: 'FastBeetle Enterprise Logistics & PhonePe Integration',
    subtitle: 'PhonePe Real-Time Payments, In-App Dispatch Communication, 5 Dashboards (-70% Load)',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    description: 'Core backend microservices for rider, merchant, and customer operations. Integrated the PhonePe payment gateway with secure HMAC-SHA256 webhooks, engineered private customer-rider communication masking and delivery alerts, slashed page load times by 70% across 5 operational dashboards, and built the automated Bulk PinZone assignment engine cutting manual ops by 90%.',
    imageUrl: '/src/assets/images/fastbeetle_logistics_ui_1792235324249.jpg',
    metrics: [
      { label: 'Page Load Time', value: '-70%' },
      { label: 'Manual Ops Saved', value: '90%' },
      { label: 'Payments', value: 'PhonePe Gateway' },
      { label: 'Dashboards', value: '5 Tuned' },
    ],
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Sequelize ORM', 'Redis', 'PhonePe Gateway', 'REST APIs', 'Webhooks'],
    githubUrl: 'https://github.com/Mubashirahmad123',
    featured: true,
    hasSimulator: true,
    simulatorType: 'pinzone',
    architecture: {
      overview: 'High-throughput logistics backend integrating PhonePe payment webhooks, communication proxies for privacy, Redis cache tagging for hot merchant routes, and atomic polygon boundary containment checks for logistics pinzones.',
      diagram: `[Rider, Merchant & Customer Apps]
                │
                ▼
      [Express API Gateway & JWT Auth]
                │
       ┌────────┼─────────────────┬──────────────────┐
       ▼        ▼                 ▼                  ▼
[Communication]  [Payment Engine] [Dashboard Router]  [PinZone Geo Engine]
 (In-App Masking, (PhonePe HMAC    (Merchant, Hub,     (Bulk Polygon Matching &
  SMS Webhooks)    Webhook Catch)   Support, Admin)     Batch Assignment)
       │                 │                 │                  │
       ▼                 ▼                 ▼                  ▼
[Gateway API]    [Redis Cache]   [Postgres DB & Index] [Audit Trail Log]`,
      keyDecisions: [
        'Built secure communication masking so riders and customers can connect through proxy channels without exposing personal contact details.',
        'Integrated PhonePe payment gateway with idempotent HMAC-SHA256 signature verification to prevent duplicate charges on network retries.',
        'Introduced Redis write-through caching on frequently visited Hub & Merchant order summaries, reducing database connection contention by 65%.',
        'Engineered atomic transaction locks during bulk pinzone migrations cutting manual operator dispatch effort by 90%.'
      ],
      techStack: [
        { category: 'Runtime & Framework', items: ['Node.js 18 LTS', 'Express.js', 'TypeScript'] },
        { category: 'Storage & Caching', items: ['PostgreSQL 15', 'Sequelize ORM', 'Redis'] },
        { category: 'External Gateways', items: ['PhonePe Payment SDK', 'SMS Webhooks', 'Payment Gateway'] }
      ],
      codeSnippets: [
        {
          filename: 'services/phonepePaymentService.js',
          language: 'javascript',
          description: 'PhonePe payment verification with HMAC-SHA256 signature validation',
          code: `const crypto = require('crypto');

function verifyPhonePeCallback(payloadBase64, receivedChecksum) {
  const secretKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX;
  
  const stringToHash = payloadBase64 + '/pg/v1/status' + secretKey;
  const calculatedSha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const expectedChecksum = \`\${calculatedSha256}###\${saltIndex}\`;

  return expectedChecksum === receivedChecksum;
}`
        },
        {
          filename: 'services/pinzoneBulkService.js',
          language: 'javascript',
          description: 'Bulk PinZone re-assignment transaction with atomic rollback',
          code: `const { sequelize, PinZone } = require('../models');

async function bulkAssignPinZones(hubId, zoneAssignments, operatorId) {
  const transaction = await sequelize.transaction();
  try {
    const updateRecords = zoneAssignments.map(item => ({
      pincode: item.pincode,
      hub_id: hubId,
      assigned_by: operatorId,
      updated_at: new Date()
    }));

    await PinZone.bulkCreate(updateRecords, {
      updateOnDuplicate: ['hub_id', 'assigned_by', 'updated_at'],
      transaction
    });

    await redisClient.del(\`cache:hub_zones:\${hubId}\`);
    await transaction.commit();
    return { success: true, count: updateRecords.length };
  } catch (error) {
    await transaction.rollback();
    throw new Error(\`Bulk zone assignment failed: \${error.message}\`);
  }
}`
        }
      ]
    }
  },
  {
    id: 'ordersnap-platform',
    title: 'OrderSnap.in — Full-Stack Dropshipping Platform',
    subtitle: 'High-Scale Merchant Console, Supplier Automation & Stock Reservation',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    description: 'Designed and deployed the end-to-end dropshipping portal OrderSnap.in. Built utilizing Node.js, Express, React, Redux Toolkit, and PostgreSQL with Sequelize, featuring secure JWT + Passport.js role-based authentication, real-time inventory synchronization, and automated order fulfillment.',
    imageUrl: '/src/assets/images/ordersnap_ecommerce_ui_1792235323781.jpg',
    metrics: [
      { label: 'Architecture', value: 'Full-Stack SPA' },
      { label: 'Security', value: 'JWT + Passport.js' },
      { label: 'State Sync', value: 'Redux Toolkit + RTK' },
      { label: 'Database', value: 'PostgreSQL' },
    ],
    tags: ['React', 'Redux Toolkit', 'Node.js', 'Express.js', 'PostgreSQL', 'Sequelize', 'Passport.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Mubashirahmad123',
    featured: true,
    hasSimulator: true,
    simulatorType: 'ordersnap',
    architecture: {
      overview: 'Modular full-stack dropship pipeline with decoupled storefront, merchant dashboard, and automated dropshipper order forwarding with transactional safety.',
      diagram: `[React 18 + Redux Toolkit Client]
                │
         (Axios + JWT Interceptor)
                │
                ▼
     [Express.js Application Server]
    ├── Passport.js JWT & Local Strategies
    ├── Merchant / Supplier Permissions Middleware
    └── Order State Machine (Pending -> Sourced -> Shipped -> Delivered)
                │
                ▼
     [PostgreSQL with Sequelize ORM]
    ├── Multi-tenant merchant records
    ├── Product catalog with stock lock guarantees
    └── Audit logs for supplier transactions`,
      keyDecisions: [
        'Utilized Redux Toolkit Query (RTK Query) for optimistic UI updates during cart and order status mutations.',
        'Enforced database-level quantity constraints to eliminate overselling during flash supplier campaigns.',
        'Secured customer personal identifiable information (PII) using AES-256 field-level encryption for dropshipping labels.'
      ],
      techStack: [
        { category: 'Frontend', items: ['React 18', 'Redux Toolkit', 'Tailwind CSS', 'Vite'] },
        { category: 'Backend', items: ['Node.js', 'Express.js', 'Passport.js', 'JWT'] },
        { category: 'Persistence', items: ['PostgreSQL', 'Sequelize ORM', 'Bcrypt'] }
      ],
      codeSnippets: [
        {
          filename: 'middleware/authGuard.js',
          language: 'javascript',
          description: 'Role-based access guard with JWT token verification',
          code: `const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied: insufficient permissions' });
  }
  next();
};

module.exports = { requireAuth, requireRole };`
        }
      ]
    }
  },
  {
    id: 'music-controller',
    title: 'Collaborative Spotify Music Controller',
    subtitle: 'Democratic Real-Time Playlist Queue via Spotify Web API & Django',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    description: 'Collaborative group music streaming session app integrating the Spotify Web API. Enabled democratic real-time playlist voting, automatic skip thresholds, and live playback synchronization across connected room guests.',
    imageUrl: '/src/assets/images/music_controller_ui_1792235322914.jpg',
    metrics: [
      { label: 'Integration', value: 'Spotify Web API' },
      { label: 'Voting Logic', value: 'Democratic Threshold' },
      { label: 'Stack', value: 'React + Django' },
      { label: 'Sync', value: 'Real-Time State' }
    ],
    tags: ['React', 'Django', 'Python', 'Spotify API', 'REST Framework', 'WebSockets'],
    githubUrl: 'https://github.com/Mubashirahmad123/music_controller',
    featured: true,
    hasSimulator: false,
    architecture: {
      overview: 'Django REST backend orchestrating Spotify OAuth tokens on behalf of host rooms, with client-side polling and guest voting mechanisms.',
      diagram: `[Host Session] ──> [Spotify OAuth 2.0] ──> [Django Room Engine]
                                                    │
[Guest Devices] ──> [Cast Vote (+1)] ───────────────┤
                                                    ▼
                                          [Check Skip Threshold]
                                                    │
                                          (Skip Spotify Track)`,
      keyDecisions: [
        'Centralized token refresh cycling in Django to prevent exposing Spotify client secrets to browser guests.',
        'Implemented stateful room codes with configurable skip thresholds per room host.'
      ],
      techStack: [
        { category: 'Frontend', items: ['React', 'Axios', 'Material UI'] },
        { category: 'Backend', items: ['Django', 'Django REST Framework', 'Python'] },
        { category: 'APIs', items: ['Spotify Web Playback SDK', 'OAuth 2.0'] }
      ],
      codeSnippets: []
    }
  },
  {
    id: 'crm-system',
    title: 'Enterprise CRM Application',
    subtitle: 'Reporting Dashboards, Contact Lifecycle & Business Intelligence',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    description: 'Comprehensive customer relationship management system featuring dynamic pipeline reporting, lead stage transitions, activity tracking, and analytics to support executive decision-making.',
    metrics: [
      { label: 'Database', value: 'MySQL' },
      { label: 'Backend', value: 'Django ORM' },
      { label: 'Analytics', value: 'Pipeline Funnel' },
      { label: 'Role Security', value: 'RBAC Multi-Level' }
    ],
    tags: ['Django', 'Python', 'MySQL', 'REST APIs', 'Chart.js', 'Bootstrap'],
    githubUrl: 'https://github.com/Mubashirahmad123',
    featured: false,
    hasSimulator: false,
    architecture: {
      overview: 'Relational data model linking Accounts, Contacts, Opportunities, and Activity logs with granular organizational role permissions.',
      diagram: `[Leads Engine] ──> [Opportunity Pipeline] ──> [Deals Won / Lost]
      │                        │
      ▼                        ▼
[Contact History]      [Executive Reports & SQL Aggregates]`,
      keyDecisions: [
        'Used database indexing on lead status and assigned sales representative IDs for sub-50ms dashboard query latency.',
        'Created modular custom Django template tags and REST views for dynamic sales chart rendering.'
      ],
      techStack: [
        { category: 'Stack', items: ['Python', 'Django', 'MySQL', 'JavaScript'] }
      ],
      codeSnippets: []
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'fastbeetle',
    role: 'Software Engineer',
    company: 'FastBeetle (Logistics & Delivery Startup)',
    location: 'Srinagar, India',
    period: 'Aug 2024 – Apr 2026',
    isCurrent: false,
    summary: 'Core engineer on backend logistics infrastructure, payment systems, and operations platforms.',
    highlightMetric: '-70% Page Load Latency across 5 Dashboards',
    bullets: [
      'Architected backend services for Rider, Merchant, and Customer applications using Node.js & Express.js, integrating PhonePe payment gateway for secure real-time transactions with webhook HMAC verification.',
      'Engineered customer-rider dispatch communication masking and automated delivery notifications, enhancing operational reliability and user privacy.',
      'Optimized 5 mission-critical dashboards (Merchant, Admin, Hub, Support, Accounts), reducing average page load time by 70% through query index restructuring, Redis caching, and N+1 query elimination.',
      'Engineered the Bulk Edit PinZone module automating zone assignments, cutting manual operator effort by 90% and saving multiple engineer-hours per week.',
      'Built OrderSnap.in full-stack dropshipping platform using Node.js, Express, React, Redux Toolkit, PostgreSQL & Sequelize with JWT + Passport.js role authentication.'
    ],
    techStack: ['Node.js', 'Express.js', 'React', 'Redux Toolkit', 'PostgreSQL', 'Sequelize', 'Redis', 'PhonePe Gateway', 'REST APIs']
  },
  {
    id: 'elyspace',
    role: 'Full Stack Developer',
    company: 'ElySpace (Software Agency)',
    location: 'Baramulla, India',
    period: 'Aug 2023 – Jul 2024',
    isCurrent: false,
    summary: 'Delivered customer-facing web platforms and scalable backends for agency clients.',
    highlightMetric: 'Delivered multiple client SaaS platforms end-to-end',
    bullets: [
      'Delivered multiple client SaaS and e-commerce projects using React, Django, and JavaScript with REST API integration and responsive UI/UX.',
      'Owned feature delivery end-to-end in Agile sprints from requirements definition and development through to cloud deployment and client handoff.',
      'Resolved backend bottlenecks and optimized deployment pipelines, maintaining high availability across concurrent production environments.'
    ],
    techStack: ['React', 'Django', 'Python', 'JavaScript', 'REST APIs', 'PostgreSQL', 'Git', 'Agile/Scrum']
  },
  {
    id: 'yarikul',
    role: 'Full Stack Intern',
    company: 'Yarikul Infotech',
    location: 'Srinagar, India',
    period: 'Mar 2023 – May 2023',
    isCurrent: false,
    summary: 'Engineered real-time chat modules and custom software utilities.',
    highlightMetric: '+20% User Engagement via Real-Time Chat',
    bullets: [
      'Built a real-time matrimonial platform using Django & Python with live chat functionality, increasing active user engagement by 20%.',
      'Developed custom WordPress plugins and a Python-based YouTube downloader utility, expanding the company’s internal product offerings.'
    ],
    techStack: ['Python', 'Django', 'WebSockets', 'MySQL', 'JavaScript', 'WordPress']
  }
];

export const SKILL_GROUPS = [
  {
    category: 'Languages & Core',
    skills: [
      { name: 'JavaScript (ES6+)', level: 'Advanced', experience: '4+ yrs', isKey: true },
      { name: 'TypeScript', level: 'Advanced', experience: '3+ yrs', isKey: true },
      { name: 'Python 3.11', level: 'Advanced', experience: '3+ yrs', isKey: true },
      { name: 'HTML5 & CSS3', level: 'Expert', experience: '4+ yrs', isKey: false },
    ]
  },
  {
    category: 'Backend & Systems',
    skills: [
      { name: 'Node.js & Express.js', level: 'Expert', experience: '3+ yrs', isKey: true },
      { name: 'Django & DRF', level: 'Advanced', experience: '2+ yrs', isKey: true },
      { name: 'PhonePe Payment Gateway', level: 'Expert', experience: '2+ yrs', isKey: true },
      { name: 'Redis Caching & REST APIs', level: 'Expert', experience: '3+ yrs', isKey: true },
      { name: 'JWT & Passport.js Auth', level: 'Advanced', experience: '2+ yrs', isKey: false },
      { name: 'Microservices Architecture', level: 'Intermediate', experience: '2 yrs', isKey: false },
    ]
  },
  {
    category: 'Frontend & UI Engineering',
    skills: [
      { name: 'React.js (18 / 19)', level: 'Expert', experience: '3+ yrs', isKey: true },
      { name: 'Redux Toolkit & RTK Query', level: 'Advanced', experience: '2+ yrs', isKey: true },
      { name: 'Tailwind CSS', level: 'Expert', experience: '3+ yrs', isKey: true },
      { name: 'Next.js & Supabase', level: 'Advanced', experience: '2+ yrs', isKey: true },
      { name: 'Zod & React Hook Form', level: 'Advanced', experience: '2 yrs', isKey: false },
    ]
  },
  {
    category: 'AI Agents & Automation',
    skills: [
      { name: 'CrewAI & Gemini 2.5 Flash', level: 'Expert', experience: '2+ yrs', isKey: true },
      { name: 'Playwright Stealth & Crawl4AI', level: 'Expert', experience: '2+ yrs', isKey: true },
      { name: '5-Tier LLM Fallback Chains', level: 'Expert', experience: '2 yrs', isKey: true },
      { name: 'FAISS Semantic Vector Search', level: 'Advanced', experience: '1+ yrs', isKey: true },
      { name: 'Docker, Linux & Pytest CI/CD', level: 'Advanced', experience: '3+ yrs', isKey: false },
    ]
  }
];
