## Instalação

Clonando o repositorio do projeto

```bash
  git clone git@github.com:Acauhi99/project-manage-backend.git
```

Instalanda dependencias do projeto

```bash
  cd backend
  npm install
```

Criar .env

```bash
  DATABASE_URL="mysql://user:123456789@localhost:3306/gerenciamento"
  PORT=8081
  JWT_SECRET="9cc7f1d429924974e80b243d16579a9a1ec950534c0badde3a29f678033934b4"
```

Subir o Container do MYSQL

```bash
  docker-compose up -d
```

Rodar as Migrations

```bash
  npx prisma generate
  npx prisma migrate dev --name init
```

Rodar o Projeto

```bash
  npm run dev
```

## Autor

- [@Acauhi99](https://github.com/Acauhi99)
