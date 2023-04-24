# Usa a imagem oficial do Node.js como imagem base
FROM node:18

# Define o diretório de trabalho como /app
WORKDIR /src

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o projeto para o diretório de trabalho
COPY . .

# Expõe a porta que o aplicativo usa
EXPOSE 3000

# Define o comando que será executado quando o contêiner for iniciado
CMD [ "npx", "ts-node", "./index.ts" ]
