import connection from "../../connection.js";
import regionFactory from "./region.js";

const con = connection('joystickPage', 'gamePage', console.log);
const direction = document.querySelector('#direction');
const pointer = document.querySelector('#pointer');
const region = regionFactory(direction);
const mediaQueryList = window.matchMedia("(orientation: landscape)");

let pointerRect = pointer.getBoundingClientRect();
let lastRegion = null;

mediaQueryList.addListener(handleOrientationChange);
function handleOrientationChange(mql) { 
    console.log(mql);
    pointerRect = pointer.getBoundingClientRect();
}

function send(data) {
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
                        code: e.target.id
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
                type: evName
            });

            send({
                event: 'touchstart',
                code: currentRegion,
                type: evName
            });

            lastRegion = currentRegion;
        });
    });



