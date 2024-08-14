FROM --platform=linux/amd64 node:16-alpine

# Crear el directorio de la aplicación y asignar permisos
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# Establecer el directorio de trabajo
WORKDIR /home/node/app

# Copiar solo package.json y package-lock.json para aprovechar el cache de Docker
COPY package*.json ./

# Cambiar al usuario node
USER node

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY --chown=node:node . .

# Exponer el puerto 80
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]