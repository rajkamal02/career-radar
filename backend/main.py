from fastapi import FastAPI
app = FastAPI()
@app.post("/analyze")
def analyze(data: dict):
    skills = data.get("skills", "").lower()

    suggestions = []

    if "python" in skills or "ml" in skills or "ai" in skills:
        suggestions.append("Data Scientist")
        suggestions.append("Machine Learning Engineer")

    if "react" in skills or "javascript" in skills:
        suggestions.append("Frontend Developer")

    if "sql" in skills or "excel" in skills:
        suggestions.append("Data Analyst")

    if not suggestions:
        suggestions.append("Explore General Software Roles")

    return {
        "input_skills": skills,
        "career_suggestions": suggestions
    }

@app.get("/jobs")
def get_jobs():
    return {
        "jobs": [
            {"title": "Python Developer", "company": "TechCorp", "location": "Remote"},
            {"title": "AI Engineer", "company": "AI Labs", "location": "Remote"},
            {"title": "Data Analyst", "company": "DataWorks", "location": "Remote"}
        ]
    }
