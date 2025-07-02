const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "Html is a markup language",
    important: true,
  },
  {
    id: 2,
    content: "Javascript is a programming language",
    important: false,
  },
  {
    id: 3,
    content: "Node.js is a runtime environment",
    important: true,
  },
];

let users = [
  {
    id: 1,
    name: "John Doe",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/users/add", (req, res) => {
  console.log(req.body);
  const newUser = {
    name: req.body.name.trim(" "),
    id: users.length + 1,
  };

  users.push(newUser);

  res.status(201).send(`User ${req.body.name} added successfully!`);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send("Note not found");
  }
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  const newNote = {
    id: notes.length + 1,
    content: req.body.content,
    important: req.body.important || false,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// sample json body of the req
// {
//   "content": "New note content",
//   "important": true
// }

app.put("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const noteIndex = notes.findIndex((n) => n.id === id);
  if (noteIndex !== -1) {
    const updatedNote = {
      ...notes[noteIndex],
      content: req.body.content,
      important: req.body.important,
    };
    notes[noteIndex] = updatedNote;
    res.json(updatedNote);
  } else {
    res.status(404).send("Note not found");
  }
});

app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const noteIndex = notes.find((n) => n.id === id);

  if (!noteIndex) {
    return res.status(404).send("Note not found");
  }

  notes = notes.filter((n) => n.id !== id);
  res.status(204).send();
});

// ✅ Serve React frontend from /frontend/build
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
