<!DOCTYPE html>
<html>
<body>
  <h1>To-Do List</h1>
  <input type="text" id="taskInput" placeholder="Add a task">
  <button onclick="addTask()">Add</button>
  <ul id="taskList"></ul>
  <script>
    function addTask() {
      let input = document.getElementById("taskInput");
      let task = input.value;
      if (task) {
        let li = document.createElement("li");
        li.textContent = task;
        document.getElementById("taskList").appendChild(li);
        input.value = ""; // Clear input
      }
    }
  </script>
</body>
</html>
