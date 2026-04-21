# Projeto Entrega - Aplicacao Fullstack (React + Node + PHP)

## 1. Visao geral
Este projeto implementa uma aplicacao fullstack com:
- Frontend em React (SPA)
- Backend Node.js para pacientes
- Backend PHP para medicos
- Banco MySQL compartilhado

A aplicacao possui menu lateral com duas secoes:
- Pacientes
- Medicos

Cada secao permite:
- Listar registros
- Criar registro
- Editar registro
- Excluir registro

## 2. Estrutura de pastas
- `app/` frontend React (Vite)
- `backendjs/` API Node.js de pacientes
- `backendphp/` API PHP de medicos
- `database/schema.sql` script de criacao de banco e tabelas
- `database/seed.sql` script de dados iniciais

## 3. Stack usada
### Frontend
- React
- React Router DOM
- Bootstrap
- Lucide React (icones)

### Backend Node
- Express
- MySQL2
- Dotenv
- CORS

### Backend PHP
- PHP 8.x
- PDO (MySQL)

### Banco
- MySQL (XAMPP)

## 4. Funcionalidades implementadas
### 4.1 Pacientes (Node)
Base URL: `http://localhost:3001/api/v1/pacientes`

- `GET /api/v1/pacientes`
- `GET /api/v1/pacientes/:id`
- `POST /api/v1/pacientes`
- `PUT /api/v1/pacientes/:id`
- `DELETE /api/v1/pacientes/:id`

### 4.2 Medicos (PHP)
Base URL: `http://localhost:3002/api/v1/medicos`

- `GET /api/v1/medicos`
- `GET /api/v1/medicos/:id`
- `POST /api/v1/medicos`
- `PUT /api/v1/medicos/:id`
- `DELETE /api/v1/medicos/:id`

### 4.3 Frontend
- Sidebar com navegacao entre Medicos e Pacientes
- Formularios de cadastro e edicao
- Tabelas com busca
- Acoes de editar e excluir
- Tratamento de mensagens de erro e sucesso

### 4.4 Base para multi linguagem
Foi adicionada base de i18n com:
- Contexto de idioma (`pt` e `en`)
- Dicionario de traducoes no frontend
- Header `X-Lang` enviado para as APIs

## 5. Pre-requisitos
- Node.js instalado
- XAMPP instalado (MySQL rodando)
- PHP (via XAMPP)
- Git

## 6. Configuracao do banco de dados
### Opcao recomendada (automatizada pelo projeto)
1. Entre na pasta do backend Node:
```bash
cd backendjs
```

2. Instale dependencias:
```bash
npm install
```

3. Configure `backendjs/.env` (exemplo padrao XAMPP):
```env
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=CHANGE_ME
DB_NAME=aplisdemo
```

4. Rode setup completo (schema + seed):
```bash
npm run db:setup
```

Esse comando executa:
- `database/schema.sql`
- `database/seed.sql`

## 7. Como rodar o projeto
## 7.1 Backend Node (pacientes)
```bash
cd backendjs
npm run dev
```
API em: `http://localhost:3001`

## 7.2 Backend PHP (medicos)
No Git Bash:
```bash
/c/xampp/php/php.exe -S localhost:3002 -t /c/git/apLIS-desenvolvedor-jr/backendphp /c/git/apLIS-desenvolvedor-jr/backendphp/router.php
```

No PowerShell/CMD:
```bash
C:\xampp\php\php.exe -S localhost:3002 -t C:\git\apLIS-desenvolvedor-jr\backendphp C:\git\apLIS-desenvolvedor-jr\backendphp\router.php
```

API em: `http://localhost:3002`

## 7.3 Frontend React
```bash
cd app
npm install
npm run dev
```
Frontend em: `http://localhost:5173`

## 8. Testes rapidos de API
### Pacientes
```bash
curl http://localhost:3001/api/v1/pacientes
```

```bash
curl -X POST "http://localhost:3001/api/v1/pacientes" -H "Content-Type: application/json" -d '{"nome":"Maria","dataNascimento":"1999-01-01","carteirinha":"999999","cpf":"12312312312"}'
```

### Medicos
```bash
curl http://localhost:3002/api/v1/medicos
```

```bash
curl -X POST "http://localhost:3002/api/v1/medicos" -H "Content-Type: application/json" -d '{"nome":"Joao da Silva","CRM":"123456","UFCRM":"CE"}'
```

## 9. Arquitetura aplicada
### Backend Node
- `src/routes/`
- `src/controllers/`
- `src/models/`
- `src/config/`

### Backend PHP
- `src/index.php` (roteamento)
- `src/controllers/`
- `src/models/`
- `src/config/`

### Frontend
- `src/router/`
- `src/layouts/`
- `src/pages/`
- `src/components/`
- `src/services/`
- `src/i18n/`

## 10. Observacoes finais
- O `README.md` original do desafio foi mantido intacto.
- Esta documentacao foi criada separadamente para explicar implementacao e uso completo da entrega.
