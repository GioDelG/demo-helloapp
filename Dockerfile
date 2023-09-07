# Usar la imagen oficial de Node.js
FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY src/server.js /app

ENV PORT=8080

# Comando para iniciar la aplicación
CMD ["node", "app/server.js"]
