// login.js
(function() {
  // Hide body content until login
  document.addEventListener('DOMContentLoaded', function() {
    document.body.style.display = 'none';
    // Create login form
    var form = document.createElement('form');
    form.id = 'login-form';
    form.style = 'margin:100px auto;max-width:300px;background:#eee;padding:20px;border-radius:10px;';
    form.innerHTML = `
      <h2>ログイン</h2>
      <label>ユーザー名: <input type="text" id="username" required></label><br><br>
      <label>パスワード: <input type="password" id="password" required></label><br><br>
      <button type="submit">ログイン</button>
    `;
    document.body.appendChild(form);
    form.onsubmit = async function(event) {
      event.preventDefault();
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      // Try to fetch users.json (relative to /login/)
      var usersPath = '/login/users.json';
      try {
        var res = await fetch(usersPath);
        var data = await res.json();
        var user = data.users.find(u => u.username === username && u.password === password);
        if (user) {
          form.style.display = 'none';
          document.body.style.display = '';
        } else {
          alert('ユーザー名またはパスワードが違います。');
        }
      } catch (e) {
        alert('ログイン情報の取得に失敗しました。');
      }
    };
  });
})();
