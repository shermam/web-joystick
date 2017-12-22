// import connection from "../../connection.js";
// import regionFactory from "./region.js";

// const con = connection('joystickPage', 'gamePage', console.log);
// const direction = document.querySelector('#direction');
// const pointer = document.querySelector('#pointer');
// const region = regionFactory(direction);

// let pointerRect = pointer.getBoundingClientRect();
// let lastRegion = null;

// addEventListener("orientationchange", _ => {
//     pointerRect = pointer.getBoundingClientRect();
// });


// function send(data) {
//     //con.peer.send(JSON.stringify(data));
// }

// Array.from(document.querySelectorAll('.action-button'))
//     .forEach(b => {
//         ['touchstart', 'touchend']
//             .forEach(evName => {
//                 b.addEventListener(evName, e => {
//                     e.stopPropagation();
//                     e.preventDefault();
//                     navigator.vibrate(50);

//                     send({
//                         event: evName,
//                         code: e.target.id
//                     });

//                 });
//             });
//     });



// ['touchstart', 'touchend', 'touchmove']
//     .forEach(evName => {
//         direction.addEventListener(evName, e => {
//             const currentRegion = region(e);

//             if (e.targetTouches.length) {
//                 pointer.style.left = (e.targetTouches[0].pageX - pointerRect.width / 2) + 'px';
//                 pointer.style.top = (e.targetTouches[0].pageY - pointerRect.height / 2) + 'px';
//             }

//             if (currentRegion === lastRegion) {
//                 return;
//             }

//             navigator.vibrate(50);

//             send({
//                 event: 'touchend',
//                 code: lastRegion,
//                 type: evName
//             });

//             send({
//                 event: 'touchstart',
//                 code: currentRegion,
//                 type: evName
//             });

//             lastRegion = currentRegion;
//         });
//     });

const orientation = document.getElementById('orientation');
const orientation2 = document.getElementById('orientation2');
const orientation3 = document.getElementById('orientation3');

// const orientation4 = document.getElementById('orientation4');
// const orientation5 = document.getElementById('orientation5');
// const orientation6 = document.getElementById('orientation6');

const orientation7 = document.getElementById('orientation7');
const orientation8 = document.getElementById('orientation8');
const orientation9 = document.getElementById('orientation9');

const r1 = document.getElementById('r1');
const r2 = document.getElementById('r2');
const r3 = document.getElementById('r3');
const r4 = document.getElementById('r4');

addEventListener('devicemotion', e => {
    orientation.style.width = mapRange(e.rotationRate.alpha, 0, 2, 50, 100) + '%';
    orientation2.style.width = mapRange(e.rotationRate.beta, 0, 2, 50, 100) + '%';
    r1.innerHTML = e.rotationRate.alpha.toFixed(3);
    r2.innerHTML = e.rotationRate.beta.toFixed(3);
    // orientation3.style.width = mapRange(e.rotationRate.gamma, 0, 10, 50, 100) + '%';

    // orientation4.style.width = mapRange(e.acceleration.x, 0, 10, 50, 100) + '%';
    // orientation5.style.width = mapRange(e.acceleration.y, 0, 10, 50, 100) + '%';
    // orientation6.style.width = mapRange(e.acceleration.z, 0, 10, 50, 100) + '%'; 
});

addEventListener('deviceorientation', e => {
    orientation7.style.width = mapRange(e.alpha, 0, 360, 0, 100) + '%';
    // orientation9.style.width = mapRange(e.beta, -180, 180, 0, 100) + '%';
    orientation8.style.width = mapRange(e.gamma, -90, 90, 0, 100) + '%';

    r3.innerHTML = e.alpha.toFixed(3);
    r4.innerHTML = e.gamma.toFixed(3);
});

function mapRange(num, fromIni, toIni, fromFim, toFim) {
    var rangeInicio = toIni - fromIni;
    var rangeFim = toFim - fromFim;
    var fator = rangeFim / rangeInicio;
    return (num - fromIni) * fator + fromFim;
}

