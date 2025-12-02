import React, { useState } from 'react';

const API_URL = 'http://127.0.0.1:8000/notes';

function NoteForm({ onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      alert("Both title and content are required.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        // Success: Clear the form and call the parent function to refresh the list
        setTitle('');
        setContent('');
        onNoteCreated();
      } else {
        alert('Failed to create note.');
      }
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Network error or server is down.');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Create New Note</h2>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
        required
      ></textarea>
      <button type="submit">Save Note</button>
    </form>
  );
}

export default NoteForm;