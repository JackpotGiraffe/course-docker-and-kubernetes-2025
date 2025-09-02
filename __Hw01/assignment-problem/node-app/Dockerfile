FROM node

WORKDIR /hw01_node

COPY package.json /hw01_node

RUN npm install

COPY . /hw01_node

EXPOSE 3000

CMD ["node", "server.js"]