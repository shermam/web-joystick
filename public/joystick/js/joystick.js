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

const orientation7 = document.getElementById('orientation7');
const orientation8 = document.getElementById('orientation8');

const r1 = document.getElementById('r1');
const r2 = document.getElementById('r2');
const r3 = document.getElementById('r3');
const r4 = document.getElementById('r4');


const centerTrashHold = 1;
let centerTimeout;

let offsetAlpha = 0;
let offsetGamma = 0;

let orientationAlpha = 0;
let oriententionGamma = 0;

addEventListener('devicemotion', e => {
    orientation.style.width = mapRange(e.rotationRate.alpha, 0, 2, 50, 100) + '%';
    orientation2.style.width = mapRange(e.rotationRate.beta, 0, 2, 50, 100) + '%';

    r1.innerHTML = (e.rotationRate.alpha || 0).toFixed(3);
    r2.innerHTML = (e.rotationRate.beta || 0).toFixed(3);

    resetCenterTimeout(e.rotationRate.alpha, e.rotationRate.beta);

});

addEventListener('deviceorientation', e => {
    orientationAlpha = normalizeAlpha(e.alpha, e.gamma);
    oriententionGamma = e.gamma;

    orientation7.style.width = mapRange(orientationAlpha + offsetAlpha, 0, 360, 0, 100) + '%';
    orientation8.style.width = mapRange(oriententionGamma + offsetGamma, -90, 90, 0, 100) + '%';

    r3.innerHTML = (orientationAlpha || 0).toFixed(3);
    r4.innerHTML = (oriententionGamma || 0).toFixed(3);
});

function normalizeAlpha(alpha, gamma) {
    return ((gamma > 0 ? 0 : 180) + alpha) % 360;
}

function center() {
    offsetAlpha = 180 - orientationAlpha;
    offsetGamma = 0 - oriententionGamma;
}

function resetCenterTimeout(alpha, beta) {
    if (alpha < centerTrashHold && beta < centerTrashHold) {
        return;
    }

    clearTimeout(centerTimeout);

    console.log('entrou aqui');

    centerTimeout = setTimeout(() => {
        center();
        console.log("center");
    }, 3000);
};

function mapRange(num, fromIni, toIni, fromFim, toFim) {
    var rangeInicio = toIni - fromIni;
    var rangeFim = toFim - fromFim;
    var fator = rangeFim / rangeInicio;
    return (num - fromIni) * fator + fromFim;
}

