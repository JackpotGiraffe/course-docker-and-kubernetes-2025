FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3008

ENV MONGODB_USERNAME=haha_nice_try
ENV MONGODB_PASSWORD=not_going_to_tell_you

# 為了能夠在開發環境配置即時更新(Live source code update)
# 必需先到package.json加入devDependencies的nodemon以及scripts的start指令 (/package.json Line 8, Line 18-20)
# 除此之外，這邊不再只是用node app.js指令啟動，而必需將指令改為npm start
# CMD ["node", "app.js"]
CMD ["npm", "start"]