FROM python

WORKDIR /python-app

COPY . /python-app/

CMD ["python", "rng.py"]

# 這個demo對python source code進行dockerizing，因為並非web based app，所以不需要設定expose port
# 除此之外在image建立完成後，實例化container時，也不需用-p參數設定暴露的port number

# rng.py的原始碼設計為執行應用程式時必須收到兩個user inputs
# Dockerfile並沒有在CMD行(Line 7)處理該問題，因為這麼做等同於
# hardcode參數給py sourcecode執行，app失去原本設計的目的；除
# 此之外執行docker run <image-id>指令也並未將適當的參數帶入，
# 於是導致初次執行時會出現錯誤訊息：
# Please enter the min number: Traceback (most recent call last):
#   File "/python-app/rng.py", line 3, in <module>
#     min_number = int(input('Please enter the min number: '))
#                      ~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# EOFError: EOF when reading a line

# 解法1: 使用docker run指令時加入參數-i，讓container進入
# interactive mode，這樣即使container運行時處於detached mode，
# 也能保持標準輸入介面的開啟狀態，讓使用者能夠輸入參數；但一般來說
# 該方法會搭配-t參數一起使用，讓container同時擁有互動式的終端機介
# 面，才能確保使用者實際能透過鍵盤輸入參數。
# docker run -it <image-id> 指令執行後：
# Please enter the min number: <user-input-1>
# Please enter the max number: <user-input-2>
# rng.py output

# 解法2：使用docker start -a -i <container-id|container-name>
# 指令啟動既有容器，如果僅使用-a參數的話，則容器會只提供標準輸出
# (output)功能以查看容器內應用程式的輸出內容，加上-i指令才會開啟標
# 準輸入(input)功能

# **執行完畢後container會停止