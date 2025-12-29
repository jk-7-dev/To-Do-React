import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./todo.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON`);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      task_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      status TEXT CHECK(status IN ('pending','completed')) DEFAULT 'pending',
      priority TEXT CHECK(priority IN ('low','medium','high')) DEFAULT 'medium',
      due_date DATE,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
  `);
});

export default db;
