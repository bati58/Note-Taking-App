from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal, create_db_and_tables
from .crud import NoteCreate, NoteOut, create_note, get_notes, delete_note

# Initialize the database and tables
create_db_and_tables()

app = FastAPI()

# Add CORS middleware to allow the React frontend to talk to the backend
origins = [
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 1. READ all notes
@app.get("/notes", response_model=list[NoteOut])
def read_notes(db: Session = Depends(get_db)):
    notes = get_notes(db)
    return notes

# 2. CREATE a note
@app.post("/notes", response_model=NoteOut)
def create_new_note(note: NoteCreate, db: Session = Depends(get_db)):
    return create_note(db=db, note=note)

# 3. DELETE a note
@app.delete("/notes/{note_id}")
def remove_note(note_id: int, db: Session = Depends(get_db)):
    if delete_note(db, note_id):
        return {"message": "Note deleted successfully"}
    raise HTTPException(status_code=404, detail="Note not found")