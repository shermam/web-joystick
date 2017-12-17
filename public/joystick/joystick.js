const auth = firebase.auth();
var peer = null;

auth.onAuthStateChanged(user => {
    if (!user) {
        return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    const userData = firebase.database().ref('users/' + user.uid);

    userData.set({
        gamePage : 0,
        joystickPage : 0
    });

    peer = new SimplePeer({ initiator: true });
    
    peer.on('error', e => {
        userData.update({ joystickPage: 0, gamePage: 0 });
        console.log('error', err);
    })
    
    peer.on('signal', function (data) {
        console.log('SIGNAL', JSON.stringify(data))
        userData.update({ gamePage: data });
    })

    userData.on('value', snapShot => {
        const value = snapShot.val();
        if (!value || !value.joystickPage) { return }
        console.log(value);
        peer.signal(value.joystickPage);
    });

    peer.on('connect', function () {
        console.log('CONNECT')
        userData.update({ joystickPage: 0, gamePage : 0 });
        peer.send('whatever' + Math.random())
    })

    peer.on('data', function (data) {
        console.log('data: ' + data)
    })

});

Array.from(document.querySelectorAll('.action-button'))
    .forEach(b => {
        ['touchenter', 'touchstart', 'click']
            .forEach(evName => {
                b.addEventListener(evName, e => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.vibrate(50);
                    console.log(e.target.id);

                    peer.send(e.target.id);
                });
            });
    });