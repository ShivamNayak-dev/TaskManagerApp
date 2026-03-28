from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import engine, Base
from app.routes import auth, task


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="TaskManager API",
    description="A scalable REST API with Authentication & Role-Based Access Control",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(task.router)

# Health check endpoint
@app.get("/", tags=["Health"])
def root():
    return {
        "message": "TaskManager API is running!",
        "version": "1.0.0",
        "docs": "/docs"
    }