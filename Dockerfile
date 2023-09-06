# Usar la imagen oficial de Node.js
FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY dist /app

ENV PORT=8080

# Comando para iniciar la aplicación
CMD ["node", "app/server.js"]
