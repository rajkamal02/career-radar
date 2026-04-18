const BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";

const getUserId = () => {
  let id = localStorage.getItem("cr_user_id");
  if (!id) {
    id = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("cr_user_id", id);
  }
  return id;
};

export const USER_ID = getUserId();

export const api = {
  getJobs: async () => {
    try {
      const res = await fetch(`${BASE}/jobs`);
      return await res.json();
    } catch { return { jobs: [], total: 0 }; }
  },
  refreshJobs: async () => {
    try {
      const res = await fetch(`${BASE}/jobs/refresh`, { method: "POST" });
      return await res.json();
    } catch { return { success: false }; }
  },
  saveProfile: async (profile) => {
    try {
      const res = await fetch(`${BASE}/profile/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, user_id: USER_ID }),
      });
      return await res.json();
    } catch { return { success: false }; }
  },
  getProfile: async () => {
    try {
      const res = await fetch(`${BASE}/profile/${USER_ID}`);
      return await res.json();
    } catch { return {}; }
  },
  saveFeedback: async (jobId, type) => {
    try {
      const res = await fetch(`${BASE}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: USER_ID, job_id: jobId, feedback_type: type }),
      });
      return await res.json();
    } catch { return { success: false }; }
  },
  getFeedback: async () => {
    try {
      const res = await fetch(`${BASE}/feedback/${USER_ID}`);
      return await res.json();
    } catch { return {}; }
  },
  getCoverLetter: async (job, profile) => {
    try {
      const res = await fetch(`${BASE}/ai/cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_title: job.title,
          job_company: job.company,
          job_description: job.description || "",
          requirements: job.requirements || [],
          user_name: profile.name,
          user_skills: profile.skills,
          user_experience: profile.experience,
        }),
      });
      return await res.json();
    } catch { return { letter: "Error generating." }; }
  },
  getSkillGap: async (job, profile) => {
    try {
      const res = await fetch(`${BASE}/ai/skill-gap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_title: job.title,
          job_description: job.description || "",
          requirements: job.requirements || [],
          user_skills: profile.skills,
          user_experience: profile.experience,
        }),
      });
      return await res.json();
    } catch { return {}; }
  },
};