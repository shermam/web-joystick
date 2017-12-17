import connection from "./connection.js";

const evtTypes = {
    'touchstart' : 'keydown', 
    'touchend' : 'keyup'
}

connection('gamePage', 'joystickPage', data => {
    data = JSON.parse(data);
    document.querySelector('h1').innerHTML = data;
    console.log(data);
  
    window.dispatchEvent(new KeyboardEvent(evtTypes[data.event], {
        code: data.code
    }));
  
});

