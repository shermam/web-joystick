import connection from "../../connection.js";
import regionFactory from "./region.js";

const con = connection('joystickPage', 'gamePage', console.log);
const direction = document.querySelector('#direction');
const pointer = document.querySelector('#pointer');
const region = regionFactory(direction);

let pointerRect = pointer.getBoundingClientRect();
let lastRegion = null;

addEventListener("orientationchange", _ => {
    pointerRect = pointer.getBoundingClientRect();
});


function send(data) {
    if (!con.peer) {
        return;
    }
    con.peer.send(JSON.stringify(data));
}

Array.from(document.querySelectorAll('.action-button'))
    .forEach(b => {
        ['touchstart', 'touchend']
            .forEach(evName => {
                b.addEventListener(evName, e => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.vibrate(50);

                    send({
                        event: evName,
                        code: e.target.id,
                        type: 'action'
                    });

                });
            });
    });



['touchstart', 'touchend', 'touchmove']
    .forEach(evName => {
        direction.addEventListener(evName, e => {
            const currentRegion = region(e);

            if (e.targetTouches.length) {
                pointer.style.left = (e.targetTouches[0].pageX - pointerRect.width / 2) + 'px';
                pointer.style.top = (e.targetTouches[0].pageY - pointerRect.height / 2) + 'px';
            }

            if (currentRegion === lastRegion) {
                return;
            }

            navigator.vibrate(50);

            send({
                event: 'touchend',
                code: lastRegion,
                type: 'direction'
            });

            send({
                event: 'touchstart',
                code: currentRegion,
                type: 'direction'
            });

            lastRegion = currentRegion;
        });
    });

const centerTrashHold = 1;
let centerTimeout;

let _offsetAlpha = 0;
let _offsetGamma = 0;

let orientationAlpha = 0;
let oriententionGamma = 0;

let changeX = 0;
let changeY = 0;

let rAFCalled = false;

addEventListener('devicemotion', e => {
    resetCenterTimeout(e.rotationRate.alpha, e.rotationRate.beta);
});

addEventListener('deviceorientation', e => {
    orientationAlpha = normalizeAlpha(e.alpha, e.gamma);
    oriententionGamma = normalizeGamma(e.gamma);

    changeX = mapRange(offsetAlpha(), 90, 270, 0, 100);
    changeY = mapRange(oriententionGamma + _offsetGamma, -90, 90, 0, 100);

    if (!rAFCalled) {
        rAFCalled = true;
        requestAnimationFrame(_ => {
            rAFCalled = false;
            send({
                event: 'camera',
                code: {
                    x: changeX,
                    y: changeY
                },
                type: 'motion'
            });
        });
    }

});

function offsetAlpha() {
    const retorno = orientationAlpha + _offsetAlpha;
    if (retorno > 360) {
        return retorno - 360;
    } else if(retorno < 0){
        return retorno + 360;
    }

    return retorno;
}

function normalizeAlpha(alpha, gamma) {
    return (((gamma > 0 ? 0 : 180) + alpha) % 360) ;
}

function normalizeGamma(gamma) {
    return gamma > 0 ? gamma : 180 + gamma;
}

function center() {
    _offsetAlpha = 180 - orientationAlpha;
    _offsetGamma = 0 - oriententionGamma;
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

