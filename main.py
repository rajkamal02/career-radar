from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/")
def home():
    return {"status": "AI Career Radar Backend Running"}

@app.post("/analyze")
def analyze(data: dict):
    skills = data.get("skills", "").lower()

    suggestions = []

    if "python" in skills or "ai" in skills:
        suggestions.append("Data Scientist")
        suggestions.append("Machine Learning Engineer")

    if "react" in skills or "javascript" in skills:
        suggestions.append("Frontend Developer")

    if "sql" in skills:
        suggestions.append("Data Analyst")

    if not suggestions:
        suggestions.append("Explore General Roles")

    return {
        "input_skills": skills,
        "career_suggestions": suggestions
    }

@app.get("/jobs")
def get_jobs():
    url = "https://remoteok.com/api"
    headers = {"User-Agent": "Mozilla/5.0"}

    try:
        response = requests.get(url, headers=headers)
        data = response.json()

        jobs = []
        for job in data[1:10]:
            jobs.append({
                "title": job.get("position"),
                "company": job.get("company"),
                "location": "Remote",
                "tags": job.get("tags", []),
                "apply_url": job.get("url"),
            })

        return {"jobs": jobs}

    except Exception as e:
        return {"error": str(e)}