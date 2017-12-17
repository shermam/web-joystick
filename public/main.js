import connection from "./connection.js";

connection('gamePage', 'joystickPage', data => document.querySelector('h1').innerHTML = data);