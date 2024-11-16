

FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production --project GalgoVinilos

FROM nginx:alpine
COPY --from=build-stage /app/dist/galgo-vinilos /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

