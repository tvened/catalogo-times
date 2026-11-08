import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Configuração da engine de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Array de dados dos times
const times = [
  { id: 1, nome: "Grêmio", estadio: "Arena do Grêmio", cidade: "Porto Alegre" },
  { id: 2, nome: "Internacional", estadio: "Beira-Rio", cidade: "Porto Alegre" },
  { id: 3, nome: "Brasil de Pelotas", estadio: "Bento Freitas", cidade: "Pelotas" }
];

// Rota 1: Página inicial (Boas-vindas)
app.get('/', (req, res) => {
  res.render('index', { 
    titulo: "Bem-vindo ao Catálogo Esportivo!" 
  });
});

// Rota 2: Lista de times
app.get('/times', (req, res) => {
  res.render('times', { times });
});

// Rota 3: Detalhes do time com base no ID
app.get('/times/:id', (req, res) => {
  const idInformado = parseInt(req.params.id);
  const timeEncontrado = times.find(t => t.id === idInformado);

  if (!timeEncontrado) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Não Encontrado</title>
      </head>
      <body>
        <h1>Time não encontrado!</h1>
        <p>O ID informado não corresponde a nenhum time cadastrado.</p>
        <p><a href="/times">Voltar para a lista de times</a></p>
      </body>
      </html>
    `);
  }

  res.render('detalhe', { time: timeEncontrado });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});