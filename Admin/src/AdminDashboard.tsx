import React, { useState } from 'react';

// Mockup slide/news data
const initialSlides = [
  { id: 1, type: 'slide', title: 'Welcome to the Masjid', content: 'Join us for daily prayers and community events.' },
  { id: 2, type: 'news', title: 'Community Iftar', content: 'Iftar will be held every Friday during Ramadan.' },
];

export default function AdminDashboard() {
  const [slides, setSlides] = useState(initialSlides);
  const [form, setForm] = useState({ type: 'slide', title: '', content: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    setSlides([
      ...slides,
      { id: Date.now(), ...form },
    ]);
    setForm({ type: 'slide', title: '', content: '' });
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Admin Panel</h1>
      <form onSubmit={handleAdd} style={{ marginBottom: 24, padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
        <label>
          Type:
          <select name="type" value={form.type} onChange={handleChange} style={{ marginLeft: 8 }}>
            <option value="slide">Slide</option>
            <option value="news">News</option>
          </select>
        </label>
        <br /><br />
        <label>
          Title:
          <input name="title" value={form.title} onChange={handleChange} style={{ marginLeft: 8, width: '80%' }} />
        </label>
        <br /><br />
        <label>
          Content:
          <textarea name="content" value={form.content} onChange={handleChange} style={{ marginLeft: 8, width: '80%' }} />
        </label>
        <br /><br />
        <button type="submit">Add</button>
      </form>
      <h2>Slides & News</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {slides.map((item) => (
          <li key={item.id} style={{ marginBottom: 16, padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
            <strong>{item.type === 'slide' ? 'Slide' : 'News'}:</strong> <b>{item.title}</b>
            <div>{item.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
