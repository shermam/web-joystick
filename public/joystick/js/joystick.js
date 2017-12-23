import connection from "../../connection.js";
import regionFactory from "./region.js";

const con = connection('joystickPage', 'gamePage', console.log);
const direction = document.querySelector('#direction');
const pointer = document.querySelector('#pointer');
const region = regionFactory(direction);

let pointerRect = pointer.getBoundingClientRect();
let lastRegion = null;
let rAFCalled = false;

addEventListener("orientationchange", _ => {
    setTimeout(() => {
        pointerRect = pointer.getBoundingClientRect();
    }, 1000);
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

addEventListener('devicemotion', e => {
    if (!rAFCalled) {
        rAFCalled = true;
        requestAnimationFrame(_ => {
            rAFCalled = false;
            send({
                event: 'camera',
                code: {
                    x: e.rotationRate.alpha,
                    y: e.rotationRate.beta
                },
                type: 'motion'
            });
        });
    }

});