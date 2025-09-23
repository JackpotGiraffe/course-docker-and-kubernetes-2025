1. 確定根目錄下沒有/src路徑
    - `docker-compose -p php-laravel-demo run --rm composer create-project --prefer-dist laravel/laravel .`
2. 變更/src/.env檔的db相關設定

3. `docker-compose -p php-laravel-demo up -d --build server`

4. 在php, mysql, server三個服務正常運作的情況下依序執行
    - `docker-compose -p php-laravel-demo run --rm artisan migrate`
    - `docker-compose -p php-laravel-demo run --rm artisan view:cache`
    - `docker-compose -p php-laravel-demo run --rm artisan key:generate`

5. (optional) `docker-compose -p php-larvel-demo run --rm npm install`

6. (others)
    - `docker-compose -p php-laravel-demo down -v`