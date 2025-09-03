FROM node:14

WORKDIR /course_45_node

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["node", "server.js"]