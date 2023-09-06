# Usar la imagen oficial de Node.js
FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
