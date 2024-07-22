#==============================================================
FROM node:18.17.0-alpine as build
WORKDIR /app

# Copia el archivo de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

#==============================================================
FROM node:18.17.0-alpine
WORKDIR /app

# Copia los archivos de construcción desde el paso anterior
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

# Exponer el puerto que Nest.js usará
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
