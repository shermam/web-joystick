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
        //document.querySelector('h1').innerHTML = data;
        data = JSON.parse(data);

        if (data.code === null) {
            return;
        }

        switch (data.type) {
            case 'direction':
                treatDirectionEvent(data)
                break;
            case 'action':
                treatActionEvent(data)
                break;
            case 'motion':
                treatMotionEvent(data)
                break;
        }

    });
};

function treatMotionEvent(data) {

    const event = new Event('mousemove', {
        bubbles: true
    });

    event.movementX = -data.code.x * 4;
    event.movementY = data.code.y * 4;

    document.body.dispatchEvent(event);
}

function treatActionEvent(data) {
    const event = new Event(evtTypes[data.event], {
        code: data.code,
        bubbles: true
    });
    event.keyCode = 32;

    document.body.dispatchEvent(event);
}

function treatDirectionEvent(data) {
    const region = regions[data.code];

    region.forEach(code => {

        const event = new Event(evtTypes[data.event], {
            code: data.code,
            bubbles: true
        });
        event.keyCode = code;

        document.body.dispatchEvent(event);
    });
}