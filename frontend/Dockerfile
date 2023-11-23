#FROM node:14
#WORKDIR /app/frontend
#RUN npm install
#COPY ./frontend /app/frontend
#RUN npm install
#CMD ["npm", "start"]
FROM nginx:1.19.6-alpine
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf