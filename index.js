const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "benserverplex.ddns.net",
  port: 3306,
  user: "alunos",
  password: "senhaAlunos",
  database: "usuarios_site"
});
app.post("/cadastrar", (req, res) => {
  const { nome, email, password } = req.body;

  const query = "INSERT INTO usuarios (nome, email, password) VALUES (?, ?, ?)";
  db.query(query, [nome, email, password], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email já cadastrado." });
      }
      return res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Erro no login." });
    if (results.length === 0) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }
    res.status(200).json({ message: "Login realizado com sucesso!", userId: results[0].id });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
