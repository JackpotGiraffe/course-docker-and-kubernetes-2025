import React, { useState, useEffect, useCallback } from 'react';

import './App.css';
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  // 初版雖然直接 hardcoded IP Address 是可以運作的，但實務上不建議這樣做
  // 1. 因為 IP Address 在 k8s service 的生命週期間肯定是會變動
  // 2. 手動更改 IP Address 也很麻煩
  // 3. 這樣會讓前端程式碼無法在本地端測試

  // 這邊在整合前端跟後端 API 服務的時候，有更進階且更佳的方式，稱為反向代理 (Reverse Proxy)，細節說明請參考 ../frontend/conf/nginx.conf
  const fetchTasks = useCallback(function () {
    fetch('/api/tasks', {
      headers: {
        'Authorization': 'Bearer abc'
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        setTasks(jsonData.tasks);
      });
  }, []);

  useEffect(
    function () {
      fetchTasks();
    },
    [fetchTasks]
  );

  function addTaskHandler(task) {
    // 目前雖然使用 IP Address 是可以運作的，但實務上不建議這樣做，因為 IP Address 在 k8s service 的生命週期間肯定是會變動
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer abc',
      },
      body: JSON.stringify(task),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (resData) {
        console.log(resData);
      });
  }

  return (
    <div className='App'>
      <section>
        <NewTask onAddTask={addTaskHandler} />
      </section>
      <section>
        <button onClick={fetchTasks}>Fetch Tasks</button>
        <TaskList tasks={tasks} />
      </section>
    </div>
  );
}

export default App;
