import connection from "./connection.js";

const evtTypes = {
    'touchstart': 'keydown',
    'touchend': 'keyup'
};

const regions = [
    [68],
    [68, 83],
    [83],
    [83, 65],
    [65],
    [65, 87],
    [87],
    [87, 68]
];

window.conectar = function () {
    connection('gamePage', 'joystickPage', data => {
        document.querySelector('h1').innerHTML = data;
        data = JSON.parse(data);

        if (data.code === null) {
            return;
        }

        if (data.code === 'KeyO') {

            const event = new Event(evtTypes[data.event], {
                code: data.code,
                bubbles: true
            });
            event.keyCode = 32;

            document.body.dispatchEvent(event);

            return;
        }

        const region = regions[data.code];

        region.forEach(code => {

            const event = new Event(evtTypes[data.event], {
                code: data.code,
                bubbles: true
            });
            event.keyCode = code;

            document.body.dispatchEvent(event);
        });


    });
};