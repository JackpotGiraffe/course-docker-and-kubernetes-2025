FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# 課程教的舊版docker語法可使用ARG key value的格式
# 新版改成ARG key=value較恰當
ARG DEFAULT_PORT=3000

# 課程教的舊版docker語法可使用ENV key value的格式
# 新版改成ENV key=value較恰當
ENV PORT=$DEFAULT_PORT

EXPOSE $PORT

# VOLUME [ "/app/node_modules" ]

CMD [ "npm", "start" ]