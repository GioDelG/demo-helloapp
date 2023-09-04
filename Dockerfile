# Usar la imagen oficial de Node.js
FROM node:16

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del servidor
COPY package*.json ./

# Puerto en el que se ejecutará la aplicación
ENV PORT=8080

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
