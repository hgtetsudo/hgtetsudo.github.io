// /login/login.js// login.js

(function() {(function() {

  document.addEventListener('DOMContentLoaded', function() {  // Hide body content until login

    // Hide all page content until login  document.addEventListener('DOMContentLoaded', function() {

    var pageChildren = Array.from(document.body.children);    document.body.style.display = 'none';

    pageChildren.forEach(function(child) {    // Create login form

      child.style && (child.style.display = 'none');    var form = document.createElement('form');

    });    form.id = 'login-form';

    form.style = 'margin:100px auto;max-width:300px;background:#eee;padding:20px;border-radius:10px;';

    // Create login form    form.innerHTML = `

    var form = document.createElement('form');      <h2>ログイン</h2>

    form.id = 'login-form';      <label>ユーザー名: <input type="text" id="username" required></label><br><br>

    form.style = 'margin:100px auto;max-width:300px;background:#eee;padding:20px;border-radius:10px;';      <label>パスワード: <input type="password" id="password" required></label><br><br>

    form.innerHTML = `      <button type="submit">ログイン</button>

      <h2>ログイン</h2>    `;

      <label>ユーザー名: <input type="text" id="username" required></label><br><br>  // Hide #page-content by default (in case script loads after DOM)

      <label>パスワード: <input type="password" id="password" required></label><br><br>  var pageContent = document.getElementById('page-content');

      <button type="submit">ログイン</button>  if (pageContent) pageContent.style.display = 'none';

    `;  document.body.appendChild(form);

    document.body.appendChild(form);    form.onsubmit = async function(event) {

      event.preventDefault();

    form.onsubmit = async function(event) {      var username = document.getElementById('username').value;

      event.preventDefault();      var password = document.getElementById('password').value;

      var username = document.getElementById('username').value;      // Try to fetch users.json (relative to /login/)

      var password = document.getElementById('password').value;      var usersPath = '/login/users.json';

      (function() {
        document.addEventListener('DOMContentLoaded', function() {
          // Hide all page content until login
          var pageChildren = Array.from(document.body.children);
          pageChildren.forEach(function(child) {
            if (child.tagName !== 'SCRIPT') child.style.display = 'none';
          });

          // Create login form
          var form = document.createElement('form');
          form.id = 'login-form';
          form.style = 'margin:100px auto;max-width:300px;background:#eee;padding:20px;border-radius:10px;';
          form.innerHTML = [
            '<h2>ログイン</h2>',
            '<label>ユーザー名: <input type="text" id="username" required></label><br><br>',
            '<label>パスワード: <input type="password" id="password" required></label><br><br>',
            '<button type="submit">ログイン</button>'
          ].join('');
          document.body.appendChild(form);

          form.onsubmit = async function(event) {
            event.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            try {
              var res = await fetch('/login/users.json');
              var data = await res.json();
              var user = data.users.find(function(u) {
                return u.username === username && u.password === password;
              });
              if (user) {
                form.remove();
                pageChildren.forEach(function(child) {
                  if (child.tagName !== 'SCRIPT') child.style.display = '';
                });
              } else {
                alert('ユーザー名またはパスワードが違います。');
              }
            } catch (e) {
              alert('ログイン情報の取得に失敗しました。');
            }
          };
        });
      })();

