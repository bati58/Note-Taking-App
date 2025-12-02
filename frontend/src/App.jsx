import React, { useState, useEffect, useCallback } from 'react';
import NoteForm from './components/NoteForm';

// Change this line:
const API_URL = 'http://127.0.0.1:8000/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch notes from the FastAPI backend
  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes:', response.statusText);
      }
    } catch (error) {
      console.error('Network error during fetch:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Function to delete a note
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Update the state to remove the deleted note without re-fetching
        setNotes(notes.filter(note => note.id !== id));
      } else {
        alert('Failed to delete note.');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Network error or server is down.');
    }
  };

  return (
    <div>
      <h1>Simple Full-Stack Notes App</h1>
      
      <NoteForm onNoteCreated={fetchNotes} />

      <h2>Your Notes ({notes.length})</h2>
      
      {isLoading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>You have no notes. Create one above!</p>
      ) : (
        <div className="note-list">
          {notes.slice().reverse().map((note) => ( 
            // .reverse() shows the newest note first
            <div key={note.id} className="note-item">
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(note.id)}
              >
                X
              </button>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;