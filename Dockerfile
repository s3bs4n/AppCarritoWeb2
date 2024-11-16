# Etapa 1: Construcción
# FROM node:18 AS build
FROM node:20-alpine AS buildstage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine
# COPY --from=buildstage /app/dist/app-carrito-web/ /usr/share/nginx/html
COPY --from=buildstage /app/dist/app-carrito-web/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
