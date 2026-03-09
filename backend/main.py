from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Allow React frontend to access the API
origins = [
    "http://localhost:5173",
    "http://localhost:8080",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PackageRequest(BaseModel):
    package_name: str


@app.post("/scan-package")
def scan_package(request: PackageRequest):

    print("Scanning package:", request.package_name)

    dependencies = random.randint(30, 80)
    vulnerabilities = random.randint(0, 6)

    return {
        "package": request.package_name,
        "security_score": random.randint(60, 95),
        "status": "Safe" if vulnerabilities < 3 else "Moderate Risk",
        "dependencies_found": dependencies,
        "vulnerabilities": vulnerabilities
    }