FROM node:14
WORKDIR /app/frontend
RUN npm install
COPY ./frontend /app/frontend
RUN npm install
CMD ["npm", "start"]