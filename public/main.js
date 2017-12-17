const auth = firebase.auth();
const h1 = document.querySelector('h1');

auth.onAuthStateChanged(user => {
    if (!user) { return;}
    
    const userData = firebase
    .database()
    .ref('users/' + user.uid);

    const p = new SimplePeer();
    p.on('error', e => { 
        userData.update({ joystickPage: 0, gamePage: 0 });
        console.log('error', err);
    })
    
    p.on('signal', function (data) {
        console.log('SIGNAL', JSON.stringify(data))
        userData.update({ joystickPage: data });
    })

    userData.on('value', snapShot => {
        const value = snapShot.val();
        if (!value || !value.gamePage) {return}
        console.log(value);
        p.signal(value.gamePage);
    });

    p.on('connect', function () {
        console.log('CONNECT')
        userData.update({ joystickPage: 0, gamePage: 0 });
        p.send('whatever' + Math.random())
    })

    p.on('data', function (data) {
        console.log('data: ' + data)
        h1.innerHTML = data;
    })
});

document.querySelector('#login')
    .addEventListener('click', e => {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    });