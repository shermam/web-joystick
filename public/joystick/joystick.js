const auth = firebase.auth();
var p = null;

Array.from(document.querySelectorAll('.action-button'))
    .forEach(b => {
        ['touchenter', 'touchstart', 'click']
            .forEach(evName => {
                b.addEventListener(evName, e => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.vibrate(50);
                    console.log(e.target.id);

                    p.send(e.target.id);
                });
            });
    });


auth.onAuthStateChanged(user => {
    if (!user) { return; }

    const userData = firebase.database().ref('users/' + user.uid);
    
    
    document.querySelector('#connect')
        .addEventListener('click', e => {
            
            console.log('connect');

            userData.set({
                gamePage : 0,
                joystickPage : 0
            });

            p = new SimplePeer({ initiator: true });
            
            p.on('error', e => {
                userData.update({ joystickPage: 0, gamePage: 0 });
                console.log('error', err);
            })
            
            p.on('signal', function (data) {
                console.log('SIGNAL', JSON.stringify(data))
                userData.update({ gamePage: data });
            })

            userData.on('value', snapShot => {
                const value = snapShot.val();
                if (!value || !value.joystickPage) { return }
                console.log(value);
                p.signal(value.joystickPage);
            });

            p.on('connect', function () {
                console.log('CONNECT')
                userData.update({ joystickPage: 0, gamePage : 0 });
                p.send('whatever' + Math.random())
            })

            p.on('data', function (data) {
                console.log('data: ' + data)
            })

        });
});

document.querySelector('#login')
    .addEventListener('click', e => {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    });
