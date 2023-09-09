# Utiliza una imagen oficial de Node.js versión 18 como base
FROM node:18
# Establece /app como el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copia los archivos package.json y package-lock.json (si existe) al directorio de trabajo del contenedor
COPY package*.json ./
# Instala las dependencias del proyecto
RUN npm install
# Copia el archivo server.js del contexto local al directorio de trabajo del contenedor
COPY src/server.js .
# Establece una variable de entorno PORT con el valor 8080
ENV PORT=8080
# Define el comando que se ejecutará cuando se inicie el contenedor. En este caso, ejecuta la aplicación usando Node.js
CMD ["node", "server.js"]