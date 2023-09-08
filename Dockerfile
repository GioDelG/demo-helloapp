# Usar la imagen de Node.js
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/server.js .

ENV PORT=8080

# Comando para iniciar la aplicación
CMD ["node", "server.js"]

