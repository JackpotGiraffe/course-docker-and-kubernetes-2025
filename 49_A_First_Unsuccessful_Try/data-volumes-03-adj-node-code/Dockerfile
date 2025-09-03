FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

# 這邊設定的是容器內的路徑
# 映射到主機的路徑是在 docker run 時指定
# 且目前的指令僅使用匿名卷 (Anonymous Volume)，將導致資料並非真的持久化的問題出現
# VOLUME [ "/app/feedback" ]

# 嘗試過上述指令後，發現資料並沒有持久化，於是將其註解，並在課程引導操作下改在建立容器 (docker run) 時加入參數，此時使用的是命名卷 (Named Volume)
# docker run -d -p 3001:80 --name feedback-app-with-volumes -v feedback:/app/feedback indianapacer15/udemy-docker-n-kubernetes-course:course-49-node

CMD [ "node", "server.js" ]