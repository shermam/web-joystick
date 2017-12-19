import connection from "../../connection.js";
import regionFactory from "./region.js";

const con = connection('joystickPage', 'gamePage', console.log);

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

                    const data = JSON.stringify({
                        event: evName,
                        code: e.target.id
                    });

                    con.peer.send(data);
                });
            });
    });


const direction = document.querySelector('#direction');
const region = regionFactory(direction);
let lastRegion = null;

['touchstart', 'touchend', 'touchmove']
    .forEach(evName => {
        direction.addEventListener(evName, e => {
            const currentRegion = region(e);
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

            console.log(currentRegion);
            lastRegion = currentRegion;
        });
    });



