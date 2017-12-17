import connection from "../connection.js";

var con = connection('joystickPage', 'gamePage', console.log);

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