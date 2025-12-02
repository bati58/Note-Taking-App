Note Taking App – Full‑Stack App
==================================

### Backend (FastAPI)

- **Create / activate venv (only if you don’t want to use the existing `backend/venv`):**

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

- **Run the backend server (Windows PowerShell / CMD):**

```bash
cd backend
venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

- The API will be available at **`http://127.0.0.1:8000`**, with notes endpoints under **`/notes`**.

### Frontend (React + Vite)

- **Install dependencies (only needed the first time or after `package.json` changes):**

```bash
cd frontend
npm install
```

- **Run the dev server:**

```bash
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

- Open your browser at **`http://127.0.0.1:5173`**.

### How it works

- The **frontend** (React + Vite) calls the backend using:
  - `GET http://127.0.0.1:8000/notes` to list notes
  - `POST http://127.0.0.1:8000/notes` to create a note
  - `DELETE http://127.0.0.1:8000/notes/{id}` to delete a note
- The **backend** uses SQLite (`backend/notes.db`) via SQLAlchemy to store notes.

Make sure the backend is running before you use the frontend, so creating / listing / deleting notes works correctly.

### One-command startup (Windows PowerShell)

- From the project root, you can start **both backend and frontend** with:

```powershell
cd C:\Users\bati\antigravity-notes   # or your cloned path
.\run.ps1
```

- This will:
  - Open one PowerShell window running the FastAPI backend.
  - Open another PowerShell window running the Vite dev server.
  - Optionally open your default browser at `http://127.0.0.1:5173`.

- If you don’t want the script to open a browser automatically:

```powershell
.\run.ps1 -NoBrowser
```
