export async function fetchRemotiveJobs(query = "python developer") {
  try {
    const res = await fetch(`https://remotive.com/api/remote-jobs?search=${query}&limit=20`);
    const data = await res.json();
    return (data.jobs || []).map(job => ({
      id: `remotive-${job.id}`,
      title: job.title,
      company: job.company_name,
      logo: job.company_name.substring(0, 2).toUpperCase(),
      location: "Remote (Global)",
      type: job.job_type || "Full-time",
      salary: job.salary || "Not specified",
      posted: new Date(job.publication_date).toLocaleDateString(),
      postedHours: Math.floor((Date.now() - new Date(job.publication_date)) / 3600000),
      source: "Remotive.com",
      description: job.description?.replace(/<[^>]*>/g, "").substring(0, 300) || "",
      requirements: job.tags || [],
      applyUrl: job.url,
      matchScore: Math.floor(Math.random() * 30) + 60,
      skillMatch: [],
      missingSkills: [],
      applyPriority: "APPLY SOON",
      experienceFit: "Check full description",
      isRemote: true,
      isFake: false,
      isFresh: Math.floor((Date.now() - new Date(job.publication_date)) / 3600000) < 48,
      isLowComp: Math.floor((Date.now() - new Date(job.publication_date)) / 3600000) < 12,
      tags: [...(job.tags?.slice(0, 2) || []), "Remote", "Live Job"],
    }));
  } catch (e) {
    console.error("Remotive error:", e);
    return [];
  }
}