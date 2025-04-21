# 使用node 14版做為image的基礎
FROM node:14

# container擁有各自獨立的檔案系統，這裡將working directory設定到檔案系統中的/app目錄下
WORKDIR /app

# 將local machine的指定檔案複製到預設(或自訂好)的working directory(小數點的意義)，這裡的目的為前一行設定的/app目錄下
COPY package.json .

# 在container中執行npm install指令
RUN npm install

# 將其他檔案複製到container中的working directory中 (第一個小數點代表local machine中所有的檔案)
COPY . .

# Container中的Web server對外開啟3000 port以聆聽容器外對容器中的web server發出的request
EXPOSE 3000

# 最後在container建構結束並啟動後，執行指令以啟動容器中的web server
CMD [ "node", "app.mjs" ]

# RUN 指令跟 CMD 指令的相異 (from copilot)

# RUN
# 用途： RUN 用於在建構（build）Docker 映像檔（image）時執行的指令。
# 執行時機： 在 Docker 映像檔的建構階段執行，產生的結果會被儲存在映像檔中。
# 常見用途： 用來安裝軟體包、執行系統更新或進行其他建構階段的操作。
# 執行環境： 每個 RUN 指令都在一個新的中間容器（intermediate container）中執行。

# CMD
# 用途： CMD 用於指定容器啟動時的預設指令或執行的程式。
# 執行時機： 在容器啟動（runtime）時執行。
# 常見用途： 用於設定容器啟動時的預設行為，例如啟動某個應用程式或進程。
# 執行環境： 只會有一個 CMD 指令生效（最後一個會覆蓋之前的），而且可以被容器運行時的參數覆蓋。

# *不在local machine上安裝任何Node.js相關工具、套件、runtime等等，而是透過image設定在container中的上述環境