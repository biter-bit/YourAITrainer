FROM node:14
WORKDIR /app/frontend
RUN npm install
COPY ./frontend /app/frontend
RUN npm install
CMD ["npm", "start"]
#FROM nginx:1.25.3-alpine
#COPY ./build /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default