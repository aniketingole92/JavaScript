<!DOCTYPE html>
<html>
<body>
  <h1 id="title">Hello</h1>
  <button onclick="changeText()">Click Me</button>
  <script>
    function changeText() {
      let title = document.getElementById("title");
      title.textContent = "Welcome to JavaScript!";
    }
  </script>
</body>
</html>
