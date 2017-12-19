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



//(function () {

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const boundaries = [
    22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5
];
    
const direction = document.querySelector('#direction');
const rect = direction.getBoundingClientRect();
const center = new Point(
    rect.width / 2,
    rect.height / 2
);

direction.addEventListener('click', e => {
    const touch = new Point(e.offsetX, e.offsetY);
    const catetoAdjacente = touch.x - center.x;
    const catetoOposto = touch.y - center.y;
    const hipotenusa = Math.sqrt(
        (catetoAdjacente * catetoAdjacente) +
        (catetoOposto * catetoOposto)
    );
    const seno = catetoOposto / hipotenusa;

    let angulo = rtod(Math.asin(seno));

    if (catetoAdjacente < 0) {
        angulo = 180 - angulo;
    } else if (catetoAdjacente >= 0 && catetoOposto < 0) {
        angulo = 360 + angulo;
    }

    let region = 0;
    for (let i = 0; i < boundaries.length; i++) {
        const element = boundaries[i];
        if (angulo < element) {
            region = i;
            break;
        }
    }

    console.log(region);
    
    

});

function rtod(r) {
    return r * 180 / Math.PI;
}
//})()

