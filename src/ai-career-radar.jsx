import { useState, useCallback, useEffect } from "react";

const MOCK_JOBS = [
  { id: 1, title: "Junior AI/ML Engineer", company: "TechVenture AI", logo: "TV", location: "Remote (Global)", type: "Full-time", salary: "$55k–$75k", posted: "1 hour ago", postedHours: 1, source: "Remote.co", description: "Build and deploy ML models for real-world NLP and CV tasks. Work closely with senior engineers on a cutting-edge AI product. Strong Python skills required.", requirements: ["Python", "Machine Learning", "TensorFlow", "NumPy", "Git"], applyUrl: "#", matchScore: 93, skillMatch: ["Python", "AI", "Web Development"], missingSkills: ["TensorFlow"], applyPriority: "APPLY NOW", experienceFit: "Perfect for freshers", isRemote: true, isFake: false, isFresh: true, isLowComp: true, tags: ["AI", "Remote", "Entry Level", "ML"] },
  { id: 2, title: "AI Prompt Engineer", company: "NeuralLabs", logo: "NL", location: "Remote (Global)", type: "Full-time", salary: "$50k–$70k", posted: "3 hours ago", postedHours: 3, source: "We Work Remotely", description: "Design, test, and optimize prompts for large language models. Work with GPT-4, Claude, and open-source LLMs to build intelligent pipelines.", requirements: ["Python", "AI", "Prompt Engineering", "LLMs", "API Integration"], applyUrl: "#", matchScore: 90, skillMatch: ["Python", "AI", "Web Development"], missingSkills: ["Prompt Engineering"], applyPriority: "APPLY NOW", experienceFit: "Great fit for fresher with AI interest", isRemote: true, isFake: false, isFresh: true, isLowComp: true, tags: ["AI", "Remote", "LLMs", "Entry Level"] },
  { id: 3, title: "Python Developer (Entry Level)", company: "DataFlow Inc", logo: "DF", location: "Remote (US/EU)", type: "Full-time", salary: "$60k–$80k", posted: "5 hours ago", postedHours: 5, source: "LinkedIn", description: "Join our backend team building data pipelines and APIs using Python. FastAPI, PostgreSQL experience is a plus.", requirements: ["Python", "FastAPI", "SQL", "REST APIs", "Git"], applyUrl: "#", matchScore: 87, skillMatch: ["Python", "Web Development"], missingSkills: ["FastAPI", "SQL"], applyPriority: "APPLY NOW", experienceFit: "Strong fit — Python core matches well", isRemote: true, isFake: false, isFresh: true, isLowComp: false, tags: ["Python", "Remote", "Backend"] },
  { id: 4, title: "Machine Learning Intern", company: "DeepMind Labs", logo: "DL", location: "Remote (Global)", type: "Internship", salary: "$30k–$45k/yr", posted: "8 hours ago", postedHours: 8, source: "AngelList", description: "Research-focused internship working on state-of-the-art ML research. Publications and open-source contributions encouraged.", requirements: ["Python", "PyTorch", "Research", "Mathematics", "Statistics"], applyUrl: "#", matchScore: 82, skillMatch: ["Python", "AI"], missingSkills: ["PyTorch", "Research"], applyPriority: "APPLY NOW", experienceFit: "Good fit — internship ideal for fresher", isRemote: true, isFake: false, isFresh: true, isLowComp: false, tags: ["ML", "Remote", "Internship", "Research"] },
  { id: 5, title: "Data Scientist (Junior)", company: "AnalyticsPlus", logo: "AP", location: "Remote (Global)", type: "Full-time", salary: "$65k–$85k", posted: "12 hours ago", postedHours: 12, source: "Remote.co", description: "Analyze large datasets, build predictive models, and present insights to stakeholders. Python and Pandas are core tools.", requirements: ["Python", "Pandas", "Data Analysis", "Visualization", "Statistics"], applyUrl: "#", matchScore: 85, skillMatch: ["Python", "AI"], missingSkills: ["Pandas", "Statistics"], applyPriority: "APPLY NOW", experienceFit: "Strong match — data + AI skills align", isRemote: true, isFake: false, isFresh: false, isLowComp: true, tags: ["Data Science", "Remote", "Entry Level"] },
  { id: 6, title: "Full Stack Developer", company: "StartupX", logo: "SX", location: "Remote (Global)", type: "Full-time", salary: "$70k–$90k", posted: "1 day ago", postedHours: 24, source: "LinkedIn", description: "Build full-stack web applications using React, Node.js, and Python backends. Fast-paced startup environment.", requirements: ["React", "Python", "Node.js", "JavaScript", "REST APIs"], applyUrl: "#", matchScore: 78, skillMatch: ["Python", "Web Development"], missingSkills: ["Node.js"], applyPriority: "APPLY SOON", experienceFit: "Good — web dev skills transfer well", isRemote: true, isFake: false, isFresh: false, isLowComp: false, tags: ["Full Stack", "Remote", "Startup"] },
  { id: 7, title: "NLP Engineer (Junior)", company: "TextAI Corp", logo: "TA", location: "Remote (Global)", type: "Full-time", salary: "$70k–$95k", posted: "1 day ago", postedHours: 26, source: "Hacker News", description: "Work on state-of-the-art NLP systems for multilingual text classification, named entity recognition, and summarization.", requirements: ["Python", "NLP", "Transformers", "spaCy", "Machine Learning"], applyUrl: "#", matchScore: 80, skillMatch: ["Python", "AI"], missingSkills: ["NLP", "Transformers"], applyPriority: "APPLY SOON", experienceFit: "AI background helps — some skill gap", isRemote: true, isFake: false, isFresh: false, isLowComp: true, tags: ["NLP", "Remote", "AI"] },
  { id: 8, title: "AI Product Engineer", company: "BuildAI", logo: "BA", location: "Remote (Global)", type: "Full-time", salary: "$80k–$100k", posted: "2 days ago", postedHours: 48, source: "Product Hunt", description: "Build AI-powered features into a SaaS product. You'll work across backend AI integration and frontend product development.", requirements: ["Python", "React", "AI APIs", "Product Sense", "3+ years exp"], applyUrl: "#", matchScore: 68, skillMatch: ["Python", "AI", "Web Development"], missingSkills: ["Product Sense", "3+ years exp"], applyPriority: "APPLY SOON", experienceFit: "Slightly overqualified role expectation vs experience", isRemote: true, isFake: false, isFresh: false, isLowComp: false, tags: ["Product", "Remote", "AI"] },
  { id: 9, title: "React Frontend Developer", company: "WebAgency", logo: "WA", location: "Remote (EU)", type: "Contract", salary: "$40/hr", posted: "2 days ago", postedHours: 52, source: "Toptal", description: "Build responsive UI components and dashboards using React, TypeScript, and Tailwind CSS.", requirements: ["React", "TypeScript", "Tailwind", "JavaScript", "CSS"], applyUrl: "#", matchScore: 65, skillMatch: ["Web Development"], missingSkills: ["TypeScript", "React advanced"], applyPriority: "APPLY SOON", experienceFit: "Partial match — web dev applies", isRemote: true, isFake: false, isFresh: false, isLowComp: false, tags: ["Frontend", "Remote", "Contract"] },
  { id: 10, title: "Backend Python Engineer", company: "CloudScale", logo: "CS", location: "Remote (US)", type: "Full-time", salary: "$85k–$110k", posted: "3 days ago", postedHours: 72, source: "LinkedIn", description: "Design scalable microservices with Python, FastAPI, and AWS. 2+ years experience preferred.", requirements: ["Python", "FastAPI", "AWS", "Microservices", "2+ years exp"], applyUrl: "#", matchScore: 72, skillMatch: ["Python"], missingSkills: ["FastAPI", "AWS", "2+ years exp"], applyPriority: "APPLY SOON", experienceFit: "Some experience gap — worth trying", isRemote: true, isFake: false, isFresh: false, isLowComp: false, tags: ["Backend", "Remote", "Python"] },
  { id: 11, title: "Computer Vision Engineer", company: "VisionTech", logo: "VT", location: "Remote (Global)", type: "Full-time", salary: "$90k–$120k", posted: "4 days ago", postedHours: 96, source: "LinkedIn", description: "Build CV models for object detection and tracking. Strong background in deep learning required. 3+ years experience.", requirements: ["Python", "OpenCV", "PyTorch", "CUDA", "Deep Learning", "3+ years"], applyUrl: "#", matchScore: 58, skillMatch: ["Python", "AI"], missingSkills: ["OpenCV", "CUDA", "Deep Learning", "3+ years"], applyPriority: "SKIP", experienceFit: "Underqualified — strong exp requirement", isRemote: true, isFake: false, isFresh: false, isLowComp: false, tags: ["CV", "Remote", "Senior"] },
  { id: 12, title: "DevOps / Platform Engineer", company: "CloudOps Ltd", logo: "CO", location: "Remote (US/EU)", type: "Full-time", salary: "$95k–$130k", posted: "5 days ago", postedHours: 120, source: "LinkedIn", description: "Manage CI/CD pipelines, Kubernetes clusters, and cloud infrastructure. 3+ years DevOps experience required.", requirements: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD", "3+ years"], applyUrl: "#", matchScore: 30, skillMatch: [], missingSkills: ["Kubernetes", "Docker", "Terraform", "AWS"], applyPriority: "SKIP", experienceFit: "Low fit — unrelated skillset", isRemote: false, isFake: false, isFresh: false, isLowComp: false, tags: ["DevOps", "Infrastructure"] },
  { id: 13, title: "EARN $500/DAY REMOTE", company: "Unknown Corp LLC", logo: "??", location: "Anywhere", type: "Freelance", salary: "$500/day guaranteed", posted: "6 hours ago", postedHours: 6, source: "Unknown Job Board", description: "Make money from home! No experience needed. Easy work. Apply now. Limited spots. No questions asked.", requirements: ["None"], applyUrl: "https://suspicious-link.xyz/click", matchScore: 15, skillMatch: [], missingSkills: [], applyPriority: "SKIP", experienceFit: "Suspicious listing", isRemote: true, isFake: true, isFresh: true, isLowComp: false, tags: ["Suspicious", "Unverified"] },
  { id: 14, title: "AI Research Assistant", company: "Stanford AI Lab", logo: "SA", location: "Remote (US)", type: "Part-time", salary: "$25k–$40k/yr", posted: "7 hours ago", postedHours: 7, source: "University Job Board", description: "Assist PhD students and professors with AI research projects. Literature review, data collection, and model experiments.", requirements: ["Python", "Research", "ML basics", "Academic writing"], applyUrl: "#", matchScore: 83, skillMatch: ["Python", "AI"], missingSkills: ["Academic writing"], applyPriority: "APPLY SOON", experienceFit: "Great entry point for freshers", isRemote: true, isFake: false, isFresh: true, isLowComp: true, tags: ["Research", "Remote", "Part-time", "AI"] },
  { id: 15, title: "Generative AI Developer", company: "CreativeAI Studio", logo: "CA", location: "Remote (Global)", type: "Full-time", salary: "$75k–$95k", posted: "9 hours ago", postedHours: 9, source: "We Work Remotely", description: "Build generative AI applications using diffusion models, LLMs, and multimodal systems. Contribute to an exciting creative AI product.", requirements: ["Python", "AI", "LLMs", "API Development", "React"], applyUrl: "#", matchScore: 88, skillMatch: ["Python", "AI", "Web Development"], missingSkills: ["LLMs"], applyPriority: "APPLY NOW", experienceFit: "Strong match — creative + technical", isRemote: true, isFake: false, isFresh: true, isLowComp: true, tags: ["GenAI", "Remote", "Creative", "Entry Friendly"] },
];

const DEFAULT_PROFILE = {
  name: "Alex Johnson",
  skills: ["Python", "AI", "Web Development", "Machine Learning", "React"],
  experience: "Fresher (0–1 year)",
  preferredRoles: ["AI Engineer", "ML Engineer", "Python Developer"],
  industries: ["Technology", "AI/ML", "SaaS"],
  location: "Remote / Global",
  salaryMin: 50000,
  salaryMax: 90000,
};

const PRIORITY_CONFIG = {
  "APPLY NOW": { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/40", dot: "bg-emerald-400" },
  "APPLY SOON": { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/40", dot: "bg-amber-400" },
  "SKIP": { bg: "bg-slate-700/50", text: "text-slate-400", border: "border-slate-600/40", dot: "bg-slate-500" },
};

function ScoreRing({ score }) {
  const r = 22, circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = score >= 80 ? "#34d399" : score >= 60 ? "#f59e0b" : "#f87171";
  return (
    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#1e293b" strokeWidth="4" />
        <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round" />
      </svg>
      <span className="absolute text-xs font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG["SKIP"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {priority}
    </span>
  );
}

function JobCard({ job, onSave, saved, onCoverLetter, onSkillGap, feedback, onFeedback }) {
  return (
    <div className={`relative bg-slate-900 border rounded-xl p-5 transition-all duration-200 hover:border-slate-600 ${job.isFake ? "border-red-800/60" : "border-slate-800"}`}>
      {job.isFake && (
        <div className="absolute top-0 left-0 right-0 bg-red-900/30 border-b border-red-800/50 rounded-t-xl px-4 py-1.5 flex items-center gap-2">
          <span className="text-red-400 text-xs font-bold">SUSPICIOUS LISTING</span>
          <span className="text-red-500/70 text-xs">— No verified company. Likely fraudulent.</span>
        </div>
      )}
      <div className={job.isFake ? "mt-7" : ""}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400 flex-shrink-0">
            {job.logo}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-100 text-sm leading-tight truncate">{job.title}</h3>
            <p className="text-slate-400 text-xs mt-0.5">{job.company} · {job.source}</p>
          </div>
          <ScoreRing score={job.matchScore} />
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs text-slate-400">📍 {job.location}</span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">{job.type}</span>
          {job.salary && <><span className="text-xs text-slate-500">·</span><span className="text-xs text-cyan-400">{job.salary}</span></>}
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-3" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{job.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.isFresh && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/25">🔥 Fresh</span>}
          {job.isLowComp && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25">📉 Low Competition</span>}
          {job.isRemote && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/25">🌐 Remote</span>}
          {job.tags.slice(0, 2).map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={job.applyPriority} />
            <span className="text-xs text-slate-500">{job.posted}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => onFeedback(job.id, feedback[job.id] === "relevant" ? null : "relevant")}
              className={`text-xs px-2 py-1 rounded-lg transition-colors ${feedback[job.id] === "relevant" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}>👍</button>
            <button onClick={() => onFeedback(job.id, feedback[job.id] === "not_relevant" ? null : "not_relevant")}
              className={`text-xs px-2 py-1 rounded-lg transition-colors ${feedback[job.id] === "not_relevant" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}>👎</button>
            <button onClick={() => onSave(job.id)}
              className={`text-xs px-2 py-1 rounded-lg transition-colors ${saved ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}>
              {saved ? "★" : "☆"}
            </button>
            <button onClick={() => onSkillGap(job)} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-colors">Gap</button>
            <button onClick={() => onCoverLetter(job)} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/30 transition-colors">Cover ✦</button>
            {!job.isFake && <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600 transition-colors">Apply →</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverLetterModal({ job, profile, onClose }) {
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(async () => {
    setLoading(true); setError(""); setLetter("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: `Write a professional cover letter (3 short paragraphs, ~200 words) for:\n\nJob: ${job.title} at ${job.company}\nDescription: ${job.description}\nRequired Skills: ${job.requirements.join(", ")}\n\nApplicant: ${profile.name}\nSkills: ${profile.skills.join(", ")}\nExperience: ${profile.experience}\n\nWrite naturally, address to Hiring Manager, sign as ${profile.name}.` }]
        })
      });
      const data = await res.json();
      setLetter(data.content?.[0]?.text || "Failed to generate.");
    } catch (e) { setError("Connection error. Check your API key in .env file."); }
    finally { setLoading(false); }
  }, [job, profile]);

  // eslint-disable-next-line
useEffect(() => { generate(); }, []);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h2 className="text-slate-100 font-semibold">✦ AI Cover Letter</h2>
            <p className="text-slate-500 text-xs mt-0.5">{job.title} at {job.company}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-2xl leading-none">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {loading && <div className="flex flex-col items-center py-16 gap-4"><div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" /><span className="text-slate-400 text-sm">Crafting your cover letter…</span></div>}
          {error && <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded-xl border border-red-800">{error}</div>}
          {letter && <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700"><pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">{letter}</pre></div>}
        </div>
        <div className="flex gap-3 p-5 border-t border-slate-800">
          <button onClick={generate} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm border border-slate-700 disabled:opacity-50">↻ Regenerate</button>
          <button onClick={() => { navigator.clipboard.writeText(letter); setCopied(true); setTimeout(() => setCopied(false), 2000); }} disabled={!letter} className="flex-1 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 text-sm border border-cyan-500/30 disabled:opacity-50">
            {copied ? "✓ Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SkillGapModal({ job, profile, onClose }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = useCallback(async () => {
    setLoading(true); setError(""); setAnalysis(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: `Analyze skill gap. Return ONLY valid JSON, no markdown:\n{\n"matchedSkills":["..."],\n"missingSkills":[{"skill":"...","priority":"high/medium/low","reason":"..."}],\n"overallFit":"0-100",\n"verdict":"one sentence",\n"learningPath":[{"skill":"...","resource":"...","timeEstimate":"X weeks"}],\n"interviewTips":["...","...","..."]\n}\n\nJob: ${job.title} at ${job.company}\nRequirements: ${job.requirements.join(", ")}\nApplicant Skills: ${profile.skills.join(", ")}\nExperience: ${profile.experience}` }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "{}";
      setAnalysis(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch (e) { setError("Analysis failed. Check your API key."); }
    finally { setLoading(false); }
  }, [job, profile]);

  // eslint-disable-next-line
useEffect(() => { analyze(); }, []);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h2 className="text-slate-100 font-semibold">⚡ Skill Gap Analysis</h2>
            <p className="text-slate-500 text-xs mt-0.5">{job.title} at {job.company}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-2xl leading-none">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading && <div className="flex flex-col items-center py-16 gap-4"><div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" /><span className="text-slate-400 text-sm">Running AI analysis…</span></div>}
          {error && <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded-xl border border-red-800">{error}</div>}
          {analysis && <>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
              <ScoreRing score={parseInt(analysis.overallFit) || 0} />
              <div><p className="text-slate-100 font-medium text-sm">{analysis.verdict}</p><p className="text-slate-400 text-xs mt-1">Overall Fit Score</p></div>
            </div>
            {analysis.matchedSkills?.length > 0 && <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">✓ Matched Skills</h3>
              <div className="flex flex-wrap gap-2">{analysis.matchedSkills.map(s => <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">{s}</span>)}</div>
            </div>}
            {analysis.missingSkills?.length > 0 && <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">⚠ Skill Gaps</h3>
              <div className="space-y-2">{analysis.missingSkills.map(s => (
                <div key={s.skill} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${s.priority === "high" ? "bg-red-500/20 text-red-400" : s.priority === "medium" ? "bg-amber-500/20 text-amber-400" : "bg-slate-700 text-slate-400"}`}>{s.priority}</span>
                  <div><p className="text-slate-200 text-xs font-medium">{s.skill}</p><p className="text-slate-500 text-xs mt-0.5">{s.reason}</p></div>
                </div>
              ))}</div>
            </div>}
            {analysis.learningPath?.length > 0 && <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">📚 Learning Path</h3>
              <div className="space-y-2">{analysis.learningPath.map((l, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-800/30 rounded-lg p-3 border border-slate-800">
                  <span className="text-xs text-cyan-400 font-mono w-5 flex-shrink-0">{i + 1}.</span>
                  <div className="flex-1"><p className="text-slate-200 text-xs font-medium">{l.skill}</p><p className="text-slate-500 text-xs">{l.resource}</p></div>
                  <span className="text-xs text-slate-500 flex-shrink-0">{l.timeEstimate}</span>
                </div>
              ))}</div>
            </div>}
            {analysis.interviewTips?.length > 0 && <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">💡 Interview Tips</h3>
              <div className="space-y-1.5">{analysis.interviewTips.map((t, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2"><span className="text-amber-400 flex-shrink-0">→</span><span>{t}</span></div>
              ))}</div>
            </div>}
          </>}
        </div>
        <div className="p-5 border-t border-slate-800">
          <button onClick={analyze} disabled={loading} className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm border border-slate-700 disabled:opacity-50">↻ Re-analyze</button>
        </div>
      </div>
    </div>
  );
}

function ProfileSidebar({ profile, onUpdate, onClose }) {
  const [local, setLocal] = useState(profile);
  const [skillInput, setSkillInput] = useState("");
  const addSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const s = skillInput.trim().replace(",", "");
      if (!local.skills.includes(s)) setLocal(p => ({ ...p, skills: [...p.skills, s] }));
      setSkillInput("");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-end z-40" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-slate-950 border-l border-slate-800 w-full max-w-md h-full flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-slate-100 font-semibold">Intelligence Profile</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-2xl">×</button>
        </div>
        <div className="flex-1 p-5 space-y-5">
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-2">Name</label>
            <input value={local.name} onChange={e => setLocal(p => ({ ...p, name: e.target.value }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-2">Skills <span className="text-slate-600 normal-case tracking-normal">(Enter dabao add karne ke liye)</span></label>
            <div className="flex flex-wrap gap-2 mb-2">
              {local.skills.map(s => (
                <span key={s} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                  {s} <button onClick={() => setLocal(p => ({ ...p, skills: p.skills.filter(x => x !== s) }))} className="text-cyan-600 hover:text-cyan-300">×</button>
                </span>
              ))}
            </div>
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Skill add karo…" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 placeholder-slate-600" />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-2">Experience Level</label>
            <select value={local.experience} onChange={e => setLocal(p => ({ ...p, experience: e.target.value }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500">
              {["Fresher (0–1 year)", "Junior (1–2 years)", "Mid-level (2–4 years)", "Senior (4+ years)"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-2">Location Preference</label>
            <select value={local.location} onChange={e => setLocal(p => ({ ...p, location: e.target.value }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500">
              {["Remote / Global", "Remote / US only", "Remote / EU only", "Hybrid", "On-site"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-2">Salary Range (USD/yr)</label>
            <div className="flex items-center gap-3">
              <input type="number" value={local.salaryMin} onChange={e => setLocal(p => ({ ...p, salaryMin: parseInt(e.target.value) }))} className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
              <span className="text-slate-600">–</span>
              <input type="number" value={local.salaryMax} onChange={e => setLocal(p => ({ ...p, salaryMax: parseInt(e.target.value) }))} className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-slate-800">
          <button onClick={() => { onUpdate(local); onClose(); }} className="w-full py-3 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30 font-medium text-sm transition-colors">Save Profile ✓</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState("best");
  const [savedJobs, setSavedJobs] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [coverLetterJob, setCoverLetterJob] = useState(null);
  const [skillGapJob, setSkillGapJob] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [alertCount, setAlertCount] = useState(3);
  const [lastRefresh] = useState(new Date());

  const toggleSave = (id) => setSavedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const handleFeedback = (id, type) => setFeedback(prev => ({ ...prev, [id]: type }));

  const filteredJobs = MOCK_JOBS.filter(j => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some(t => t.toLowerCase().includes(q));
    if (activeTab === "best") return matchesSearch && j.matchScore >= 70 && !j.isFake;
    if (activeTab === "new") return matchesSearch && j.postedHours <= 24;
    if (activeTab === "remote") return matchesSearch && j.isRemote;
    if (activeTab === "saved") return savedJobs.includes(j.id) && matchesSearch;
    return matchesSearch;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const stats = {
    total: MOCK_JOBS.filter(j => !j.isFake).length,
    applyNow: MOCK_JOBS.filter(j => j.applyPriority === "APPLY NOW").length,
    fresh: MOCK_JOBS.filter(j => j.isFresh).length,
    avgMatch: Math.round(MOCK_JOBS.filter(j => !j.isFake).reduce((acc, j) => acc + j.matchScore, 0) / MOCK_JOBS.filter(j => !j.isFake).length),
  };

  const TABS = [
    { id: "best", label: "Best Matches", count: MOCK_JOBS.filter(j => j.matchScore >= 70 && !j.isFake).length },
    { id: "new", label: "New Jobs", count: MOCK_JOBS.filter(j => j.postedHours <= 24).length },
    { id: "remote", label: "Remote", count: MOCK_JOBS.filter(j => j.isRemote).length },
    { id: "saved", label: "Saved", count: savedJobs.length },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input, select, option { background-color: #0f172a !important; color: #e2e8f0 !important; }
      `}</style>

      <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <span className="text-cyan-400 text-xs font-bold">AI</span>
            </div>
            <span className="font-bold text-sm">Career Radar</span>
          </div>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search jobs, skills, companies…"
            className="flex-1 max-w-md bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-slate-600" />
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs text-slate-400">Live</span>
            </div>
            {alertCount > 0 && (
              <div className="relative cursor-pointer" onClick={() => setAlertCount(0)}>
                <span className="text-slate-400 text-sm">🔔</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center text-xs text-slate-950 font-bold">{alertCount}</span>
              </div>
            )}
            <button onClick={() => setShowProfile(true)} className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 hover:border-slate-600 transition-colors">
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs text-cyan-400 font-semibold">{profile.name[0]}</div>
              <span className="text-xs text-slate-300 hidden sm:block">{profile.name}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Jobs", value: stats.total, color: "text-slate-200" },
            { label: "Apply Now", value: stats.applyNow, color: "text-emerald-400" },
            { label: "Fresh Today", value: stats.fresh, color: "text-orange-400" },
            { label: "Avg Match", value: `${stats.avgMatch}%`, color: "text-cyan-400" },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-5 flex items-center gap-4 flex-wrap">
          <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-sm font-bold text-cyan-400 flex-shrink-0">{profile.name[0]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200">{profile.name} · <span className="text-slate-400 font-normal">{profile.experience}</span></p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {profile.skills.map(s => <span key={s} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-full">{s}</span>)}
            </div>
          </div>
          <button onClick={() => setShowProfile(true)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-colors flex-shrink-0">Edit Profile</button>
        </div>

        {alertCount > 0 && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 mb-5 flex items-center gap-3">
            <span className="text-cyan-400">🔥</span>
            <p className="text-sm text-cyan-300 flex-1"><strong>{alertCount} high-match jobs</strong> found — including 93% match at TechVenture AI!</p>
            <button onClick={() => setAlertCount(0)} className="text-xs text-cyan-600 hover:text-cyan-400">✕</button>
          </div>
        )}

        <div className="flex items-center gap-1 mb-5 bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-slate-700 text-slate-100" : "text-slate-500 hover:text-slate-300"}`}>
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-800 text-slate-600"}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-500">{filteredJobs.length} jobs · Refresh: {lastRefresh.toLocaleTimeString()}</p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            {activeTab === "saved" ? "Koi saved job nahi — ★ star dabao save karne ke liye" : "Koi job nahi mila"}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} saved={savedJobs.includes(job.id)} feedback={feedback}
                onSave={toggleSave} onCoverLetter={setCoverLetterJob} onSkillGap={setSkillGapJob} onFeedback={handleFeedback} />
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-700">
          AI Career Radar · Only public job data · No credentials stored · Built with React + Claude AI
        </div>
      </div>

      {showProfile && <ProfileSidebar profile={profile} onUpdate={setProfile} onClose={() => setShowProfile(false)} />}
      {coverLetterJob && <CoverLetterModal job={coverLetterJob} profile={profile} onClose={() => setCoverLetterJob(null)} />}
      {skillGapJob && <SkillGapModal job={skillGapJob} profile={profile} onClose={() => setSkillGapJob(null)} />}
    </div>
  );
}


