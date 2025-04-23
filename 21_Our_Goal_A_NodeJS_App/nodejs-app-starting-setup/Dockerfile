# 建立客製化映像(Image)

# 決定基礎映像(baseImage)
FROM node

# 因本客製化image/container希望app於node_app目錄下作業，故設定working directory
WORKDIR /node_app

# 單獨將package.json先行複製到容器中以備給下一行指令使用
# 避免在層狀依賴架構下，因為未命中緩存導致每次僅修改程式碼就需要重新執行一次npm install，浪費過多時間及資源在rebuild上
COPY package.json /node_app

# 要求Image/Container創建過程中執行指令
# 指令預設都會在working directory下執行，前面指令沒有進行設定的話，會預設於根目錄下
RUN npm install

# 將Host(local machine)的檔案複製到Image中或創建好的Container中
# dot(.)代表Host當前Dockerfile所在的目錄中的全部檔案，包含子目錄下的所有內容
# /node_app代表Image/Container中，根目錄下創建的node_app目錄(如果不想指定資料夾，可使用dot(.)表示根目錄下即可)
# 因為前面有設定working directory，故本行也可寫成:
# COPY . ./
COPY . /node_app

# RUN
# 用途： RUN 用於在建構（build）Docker 映像檔（image）時執行的指令。
# 執行時機： 在 Docker 映像檔的建構階段執行，產生的結果會被儲存在映像檔中。
# 常見用途： 用來安裝軟體包、執行系統更新或進行其他建構階段的操作。
# 執行環境： 每個 RUN 指令都在一個新的中間容器（intermediate container）中執行。

# 分隔線以上做image setup 
# ------------------------- 分隔線 -------------------------
# 分隔線以下包含當一個container基於該image啟動後需執行的動作

# (optional) 根據./server.js的Line46
EXPOSE 80
# 補充：EXPOSE 在某些情況下仍然有意義
# 例如在使用 docker-compose 時，EXPOSE 可以自動與其他容器建立網絡連接，或在某些工具中作為提示性信息。

# 當所有創建步驟完成後，啟動node server
CMD ["node", "server.js"]

# CMD
# 用途： CMD 用於指定容器啟動時的預設指令或執行的程式。
# 執行時機： 在容器啟動（runtime）時執行。
# 常見用途： 用於設定容器啟動時的預設行為，例如啟動某個應用程式或進程。
# 執行環境： 只會有一個 CMD 指令生效（最後一個會覆蓋之前的），而且可以被容器運行時的參數覆蓋。