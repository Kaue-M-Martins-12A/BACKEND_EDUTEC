const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "benserverplex.ddns.net",
  port: 3306,
  user: "alunos",
  password: "senhaAlunos",
  database: "usuarios_site"
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log("Conectado ao banco game_site!");
  }
});

module.exports = db;
