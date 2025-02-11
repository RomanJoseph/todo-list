# 📝 TODO API & Frontend

Este projeto é uma aplicação full-stack contendo uma **API em Node.js (Express)** e um **Frontend em Next.js**.  
Ambos os serviços rodam em containers Docker e utilizam um banco de dados **PostgreSQL**.

## 📌 Tecnologias Utilizadas

- **Backend:** Node.js, Express, TypeORM
- **Frontend:** Next.js
- **Banco de Dados:** PostgreSQL
- **Docker e Docker Compose** para facilitar a execução dos serviços

---

## 🚀 **Como rodar o projeto (Desenvolvimento)**

### **1️⃣ Pré-requisitos**
Antes de iniciar, você precisa ter instalado:
- [Docker](https://www.docker.com/)

### **2️⃣ Configurar variáveis de ambiente**
Crie um arquivo **`.env`** na raiz do projeto com as seguintes configurações:

```dotenv
# Ambiente de desenvolvimento
ENVIRONMENT=development
NODE_ENV=development

# Configuração da API
API_PORT=3001

# Banco de dados
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=tododb
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=tododb

# Configuração do frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Se quiser, copie rapidamente o modelo:
```bash
cp .env.example .env
```

### **3️⃣ Rodar o projeto**
Agora, execute o seguinte comando:

```bash
sudo docker compose up --build
```

### **4️⃣ Acessar o projeto**
Após iniciar os containers, acesse:
- **Frontend:** [`http://localhost:3000`](http://localhost:3000)
- **API:** [`http://localhost:3001`](http://localhost:3001)

Se precisar visualizar os logs:
```bash
docker-compose logs -f

---

## 🛠 **Executando os testes**
Para rodar os testes automatizados sem interferir no banco de dados principal, usamos um **banco separado (`postgres-test`)**.

### **1️⃣ Criar o arquivo `.env.test`**
Crie um arquivo `.env.test` dentro da pasta `api` com as configurações do banco de dados de testes:

```dotenv
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=todo_test
```

### **2️⃣ Rodar os testes**
Agora,com os containers de desenvolvimento rodando,dentro da pasta `api`, execute:

```bash
yarn test:integration
```

---

## 🌍 **Rodando em Produção**
Para rodar a aplicação em um ambiente de produção, siga estes passos.

### **1️⃣ Criar o arquivo `.env.production`**
Crie um arquivo `.env.production` com configurações seguras para o ambiente de produção:

```dotenv
# Ambiente de produção
ENVIRONMENT=production
NODE_ENV=production

# Configuração da API
API_PORT=3001

# Banco de dados (senhas mais seguras)
POSTGRES_USER=prod_user
POSTGRES_PASSWORD=prod_secure_password
POSTGRES_DB=prod_db
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=prod_user
DB_PASSWORD=prod_secure_password
DB_DATABASE=prod_db

# Configuração do frontend
NEXT_PUBLIC_API_URL=https://minhaapi.com
```

### **2️⃣ Rodar o projeto em produção**
Execute o seguinte comando:

```bash
docker-compose -f docker-compose.prod.yml --env-file .env.production up --build -d
```

### **3️⃣ Acessar a aplicação em produção**
Após iniciar os containers, acesse:
- **Frontend:** [`http://seu-servidor:3000`](http://seu-servidor:3000)
- **API:** [`http://seu-servidor:3001`](http://seu-servidor:3001)


## 📜 **Checklist Rápido**
### **Desenvolvimento**
✅ Criar `.env`: `cp .env.example .env`  
✅ Rodar `sudo docker-compose up --build`  
✅ Acessar: `http://localhost:3000` (Frontend) e `http://localhost:3001` (API)  

### **Testes**
✅ Estar com o container do banco de teste radando (iniciado no passo anterior)
✅ Criar `.env.test`: `cp .env.example api/.env.test`  
✅ Rodar `yarn test:integration`  

### **Produção**
✅ Criar `.env.production`: `cp .env.example .env.production`  
✅ Rodar `docker-compose -f docker-compose.prod.yml --env-file .env.production up --build -d`  