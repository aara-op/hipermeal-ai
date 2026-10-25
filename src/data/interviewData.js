// Comprehensive Mock Data and Engine Config for Sentinel-Interview & HiperSkin

export const SAMPLE_JOB_ROLES = [
  {
    id: 'fullstack-sr',
    title: 'Senior Full-Stack & AI Systems Engineer',
    department: 'Core Platform Engineering',
    experienceLevel: 'Senior (4-7 years)',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'System Design', 'PostgreSQL', 'Docker', 'REST/GraphQL'],
    description: `We are seeking a Senior Full-Stack & AI Systems Engineer to architect resilient web applications, build real-time multi-agent services, and design scalable APIs. You will lead technical design, optimize low-latency communications, and guide engineering best practices.`
  },
  {
    id: 'backend-architect',
    title: 'Distributed Systems & Cloud Architect',
    department: 'Infrastructure & Cloud',
    experienceLevel: 'Lead / Principal (7+ years)',
    requiredSkills: ['Go', 'Python', 'Kubernetes', 'Kafka', 'Microservices', 'Distributed Systems', 'PostgreSQL', 'AWS/GCP'],
    description: `Looking for a Distributed Systems Architect to build high-throughput transaction pipelines, event-driven microservices, and fault-tolerant cloud infrastructure.`
  },
  {
    id: 'ml-engineer',
    title: 'Computer Vision & GenAI Engineer',
    department: 'Applied AI Research',
    experienceLevel: 'Mid-Level (2-4 years)',
    requiredSkills: ['PyTorch', 'OpenCV', 'MediaPipe', 'Python', 'FastAPI', 'LLMs', 'Transformer Models', 'Model Quantization'],
    description: `Join our AI team to deploy real-time vision pipelines, optimize edge neural networks, and integrate multimodal LLMs into user-facing web applications.`
  }
];

export const SAMPLE_CANDIDATE_RESUMES = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    role: 'Senior Full-Stack Engineer',
    experienceYears: 5.5,
    extractedSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS ECS', 'System Architecture'],
    education: 'B.S. in Computer Science - University of California, Berkeley',
    summary: 'Full-stack software engineer with 5+ years of experience designing scalable web services, microservices, and responsive client architectures. Experience leading cloud migrations and optimizing real-time data pipelines.',
    projects: [
      {
        title: 'Real-Time Collaboration Canvas',
        tech: 'React, Node.js, WebSockets, Redis Pub/Sub',
        highlight: 'Scaled websocket concurrent connections to 50k active users with sub-20ms message delivery.'
      },
      {
        title: 'Microservices Payment Gateway',
        tech: 'Python, FastAPI, PostgreSQL, Docker, AWS',
        highlight: 'Designed idempotent transaction API handling $2M daily volume with 99.99% uptime.'
      }
    ]
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'Full-Stack Developer',
    experienceYears: 3,
    extractedSkills: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git', 'Tailwind CSS'],
    education: 'B.Tech in Computer Engineering - RGIPT',
    summary: 'Motivated software engineer skilled in modern frontend frameworks and backend API design. Passionate about clean code, performance optimization, and intuitive UI/UX design.',
    projects: [
      {
        title: 'E-Commerce Analytics Portal',
        tech: 'React, Express, MongoDB, Chart.js',
        highlight: 'Built real-time sales dashboard reducing page load times by 40%.'
      }
    ]
  }
];

// Pre-generated 10 Core Questions matching Alex Rivera + Senior Full-Stack Role
export const DEFAULT_INTERVIEW_QUESTIONS = [
  // 1-2 Warm-ups (Unscored Ice-Breakers)
  {
    id: 'q-ice-1',
    category: 'Ice-Breaker',
    agent: 'Corporate Behavioral Trainer',
    isIceBreaker: true,
    question: "Welcome Alex! To help you get comfortable, could you share a bit about what sparked your passion for engineering and what excited you most about this role today?",
    expectedKeypoints: ["Passionate tone", "Authentic motivation", "Clear communication"],
    timeLimit: 90
  },
  // Core Question 1: Experience & Resume Integrity
  {
    id: 'q-core-1',
    category: 'Experience & Architecture',
    agent: 'Lead Technical Architect',
    isIceBreaker: false,
    question: "In your resume, you highlighted a Real-Time Collaboration Canvas scaling to 50k concurrent WebSockets using Redis Pub/Sub. How did you handle network partition, node reconnections, and message deduplication under load?",
    expectedKeypoints: ["Redis Pub/Sub limitations", "Idempotency keys", "Heartbeats & reconnect backoff", "Message ACK queues"],
    timeLimit: 120
  },
  // Core Question 2: Technical Deep Dive - Frontend State & Performance
  {
    id: 'q-core-2',
    category: 'Technical Depth',
    agent: 'Lead Technical Architect',
    isIceBreaker: false,
    question: "In a heavy React 19 application dealing with live streaming telemetry, how do you prevent re-rendering bottlenecks without over-complicating state management?",
    expectedKeypoints: ["State colocation", "useDeferredValue / Transitions", "Memoization tradeoffs", "Canvas/Offscreen rendering"],
    timeLimit: 120
  },
  // Core Question 3: Interactive Logic & Pseudocode Debugging
  {
    id: 'q-core-3',
    category: 'Interactive Logic Debugging',
    agent: 'Lead Technical Architect',
    isIceBreaker: false,
    question: "Take a look at the displayed pseudocode on your screen. There is a critical concurrency bug in our token-bucket rate limiter. Walk me through the issue and describe how you would patch it.",
    codeSnippet: `// Token Bucket Rate Limiter
function allowRequest(userId, maxTokens, refillRate) {
  let user = cache.get(userId);
  let now = Date.now();
  
  if (!user) {
    user = { tokens: maxTokens, lastRefill: now };
  } else {
    let elapsed = (now - user.lastRefill) / 1000;
    user.tokens = Math.min(maxTokens, user.tokens + elapsed * refillRate);
    user.lastRefill = now;
  }

  if (user.tokens >= 1) {
    user.tokens -= 1;
    cache.set(userId, user); // <-- Critical race condition under concurrent requests!
    return true;
  }
  return false;
}`,
    expectedKeypoints: ["Race condition between read and write", "Atomic Redis EVAL script or Lua script", "Optimistic locking / Mutex"],
    timeLimit: 150
  },
  // Core Question 4: System Design & Scalability
  {
    id: 'q-core-4',
    category: 'System Design',
    agent: 'Lead Technical Architect',
    isIceBreaker: false,
    question: "If our microservices payment gateway suddenly experiences a 10x surge in webhook callbacks from stripe/paypal, what architecture pattern ensures zero message loss while protecting downstream databases from crashing?",
    expectedKeypoints: ["Message broker buffer (Kafka / RabbitMQ / SQS)", "Backpressure & rate-limited workers", "Dead letter queue (DLQ)", "Idempotent database writes"],
    timeLimit: 120
  },
  // Core Question 5: Database & Indexing
  {
    id: 'q-core-5',
    category: 'Technical Depth',
    agent: 'Lead Technical Architect',
    isIceBreaker: false,
    question: "When query execution time on a PostgreSQL table with 20 million rows slows down, walk me through your diagnostic process. When would a composite B-tree index fail to be utilized?",
    expectedKeypoints: ["EXPLAIN ANALYZE", "Leftmost column rule in composite indexes", "High cardinality vs table scan", "Index bloat & VACUUM"],
    timeLimit: 120
  },
  // Core Question 6: Behavioral - Conflict & Engineering Disagreement
  {
    id: 'q-core-6',
    category: 'Behavioral & Culture',
    agent: 'Corporate Behavioral Trainer',
    isIceBreaker: false,
    question: "Tell me about a time when you strongly disagreed with a product manager or senior tech lead regarding architectural direction or delivery deadlines. How did you communicate your concerns and what was the outcome?",
    expectedKeypoints: ["STAR methodology", "Data-driven persuasion", "Respectful dialogue", "Accountability & commitment"],
    timeLimit: 120
  },
  // Core Question 7: Behavioral - Incident Management & Ownership
  {
    id: 'q-core-7',
    category: 'Behavioral & Culture',
    agent: 'Corporate Behavioral Trainer',
    isIceBreaker: false,
    question: "Describe an incident where a production outage was caused directly by code you reviewed or deployed. How did you react in the heat of the moment, and what systemic changes did you implement afterwards?",
    expectedKeypoints: ["Blameless post-mortem", "Immediate triage & rollback", "Automated regression tests", "Humility & ownership"],
    timeLimit: 120
  },
  // Core Question 8: Security & API Integrity
  {
    id: 'q-core-8',
    category: 'Technical Depth',
    agent: 'Lead Technical Architect',
    isIceBreaker: false,
    question: "How do you secure server-to-server API communications against replay attacks, unauthorized data tampering, and credential leakage in a zero-trust architecture?",
    expectedKeypoints: ["HMAC signatures with timestamps", "mTLS (mutual TLS)", "Short-lived JWTs / rotating secrets", "Strict input schema validation"],
    timeLimit: 120
  },
  // Core Question 9: Scenario - Technical Debt vs Speed
  {
    id: 'q-core-9',
    category: 'Scenario & Judgment',
    agent: 'Corporate Behavioral Trainer',
    isIceBreaker: false,
    question: "Imagine the executive team asks for a critical client feature delivered in 48 hours, but doing so requires bypassing your test suite and hardcoding credentials. What is your response and proposed compromise?",
    expectedKeypoints: ["Firm boundary on security", "Scope negotiation / MVP slicing", "Explicit technical debt tracking", "Feature flagging"],
    timeLimit: 120
  },
  // Core Question 10: Candidate Vision & Reflection
  {
    id: 'q-core-10',
    category: 'Growth & Reflection',
    agent: 'Corporate Behavioral Trainer',
    isIceBreaker: false,
    question: "Looking back at the technologies you have mastered over the past 3 years, what is one technical bet you made that proved wrong, and what did you learn about evaluating new software stacks?",
    expectedKeypoints: ["Self-awareness", "Hype vs pragmatic utility", "Evaluation criteria", "Continuous learning"],
    timeLimit: 90
  }
];

// Anti-Cheating & Proctoring Rules Configuration
export const PROCTORING_CONFIG = {
  yoloFaceAngleLimitDeg: 30, // Face angle must not exceed 30 deg
  yoloFaceAngleDurationSec: 7, // For more than 7 seconds
  gazeOffscreenDurationSec: 5, // Eye gaze held offscreen > 5s
  gazeMaxWarnings: 2, // 2 warnings before penalty
  mobileCameraGlanceLimit: 2, // Not allowed to look > 2 times toward phone cam
  unauthorizedDeviceAlertLimit: 2, // 2 alerts results in disqualification
  faceReIdIntervalSec: 10, // Face recognition every 10 seconds
  maxCameraDisconnects: 2,
  audioLipSyncThresholdMs: 250 // Detect voice when lips are not moving
};

// HiperSkin Sample Data for Problem Statement 2 (ISIC Dataset Simulation)
export const HIPERSKIN_SAMPLE_CASES = [
  {
    id: 'case-1',
    title: 'Dorsal Forearm Pigmented Macule',
    timeframe: 'March 2025 vs. October 2026 (7 Months Interval)',
    imageBefore: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    metrics: {
      areaChangePercent: '+9.4%',
      colorDeltaE: '4.8 (Subtle Darkening)',
      borderAsymmetryScore: '0.12 (Low Asymmetry)',
      diameterMmBefore: '5.2 mm',
      diameterMmAfter: '5.7 mm'
    },
    gemmaObservation: `Visual Comparison Analysis (Non-Diagnostic):
• Size & Coverage: The pigmented region in the follow-up photograph exhibits an estimated 9.4% increase in surface area (approx. +0.5 mm in maximum axial diameter).
• Coloration: A minor increase in deeper brown pigment concentration is observable around the upper-left boundary compared to baseline.
• Border Definition: Margins remain relatively uniform with no jagged dendritic projections detected.
• Important Notice: This comparison highlights visible morphological shifts for personal tracking. It is not a clinical assessment. Please consult a licensed dermatologist for professional dermoscopic examination.`
  },
  {
    id: 'case-2',
    title: 'Shoulder Region Border Tracking',
    timeframe: 'January 2026 vs. September 2026 (8 Months Interval)',
    imageBefore: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop&q=80',
    metrics: {
      areaChangePercent: '+1.8% (Stable)',
      colorDeltaE: '1.2 (Uniform)',
      borderAsymmetryScore: '0.04 (Symmetric)',
      diameterMmBefore: '4.1 mm',
      diameterMmAfter: '4.2 mm'
    },
    gemmaObservation: `Visual Comparison Analysis (Non-Diagnostic):
• Size & Coverage: Surface area shows minimal variation (+1.8%), well within standard photographic distance tolerance.
• Coloration: Pigmentation distribution appears stable with consistent light-tan saturation across both timeframes.
• Border Definition: Periphery displays smooth contour continuity with no novel peripheral markings.
• Important Notice: Always maintain regular clinical checkups with your healthcare provider.`
  }
];
