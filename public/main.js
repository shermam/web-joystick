const auth = firebase.auth();
const h1 = document.querySelector('h1');

auth.onAuthStateChanged(user => {
    if (!user) { 
        return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    
    const userData = firebase.database().ref('users/' + user.uid);

    const peer = new SimplePeer();

    peer.on('error', e => { 
        userData.update({ joystickPage: 0, gamePage: 0 });
        console.log('error', err);
    })
    
    peer.on('signal', function (data) {
        console.log('SIGNAL', JSON.stringify(data))
        userData.update({ joystickPage: data });
    })

    userData.on('value', snapShot => {
        const value = snapShot.val();
        if (!value || !value.gamePage) {return}
        console.log(value);
        peer.signal(value.gamePage);
    });

    peer.on('connect', function () {
        console.log('CONNECT')
        userData.update({ joystickPage: 0, gamePage: 0 });
        peer.send('whatever' + Math.random())
    })

    peer.on('data', function (data) {
        console.log('data: ' + data)
        h1.innerHTML = data;
    })
});