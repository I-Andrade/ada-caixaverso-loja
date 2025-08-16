const jsonServer = require('json-server');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Caminho para o seu db.json
const middlewares = jsonServer.defaults();

// Middleware para simular a autenticação com token
const checkAuthToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // Simulando um token válido (geralmente você usaria JWT)
  const validToken = 'Bearer token-1';

  if (!token || token !== validToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();  // O token é válido, então prossiga com a requisição
};

// Configuração do CORS para permitir credenciais
server.use((req, res, next) => {
  // Permitir somente o domínio específico (ajuste conforme necessário)
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Ajuste para o seu domínio
  res.header('Access-Control-Allow-Credentials', 'true');  // Permitir credenciais (cookies/tokens)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Se for uma requisição OPTIONS (pré-vôo de CORS), responde imediatamente
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Configuração do express para parsear JSON
server.use(express.json());

// Usar os middlewares padrão do json-server
server.use(middlewares);

// Rota de login (simula o login com um token)
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Simula um processo de login
  if (email === 'a@a' && password === '123456') {
    const token = 'token-1'; // Token fictício
    return res.status(200).json({ token });
  }
  
  return res.status(401).json({ message: 'Invalid credentials' });
});

// // Middleware para autenticar a rota /auth/me
// server.get('/auth/me', checkAuthToken, (req, res) => {
//   const user = { id: 1, name: 'John Doe', email: 'user@example.com' };  // Dados fictícios
//   res.status(200).json(user);
// });

// Logout (simulado, só para ilustrar)
server.post('/auth/logout', checkAuthToken, (req, res) => {
  res.status(200).json({ message: 'Logged out' });
});

// As rotas que você deseja proteger (por exemplo, /users) devem usar o middleware de autenticação
server.use('/users', checkAuthToken);

// Usando o roteador do JSON Server para o restante das rotas
server.use(router);

// Inicia o servidor
server.listen(3099, () => {
  console.log('JSON Server is running on http://localhost:3099');
});
