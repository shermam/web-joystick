import connection from "../connection.js";

var con = connection('joystickPage', 'gamePage', console.log);

Array.from(document.querySelectorAll('.action-button'))
    .forEach(b => {
        ['touchenter', 'touchstart', 'click']
            .forEach(evName => {
                b.addEventListener(evName, e => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.vibrate(50);
                    con.peer.send(e.target.id);
                });
            });
    });