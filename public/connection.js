export default function connection(local, remote, ondata) {
    const auth = firebase.auth();
    var _connection = {};

    auth.onAuthStateChanged(user => {
        if (!user) {
            return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        }

        const userData = firebase.database().ref('users/' + user.uid);

        userData.set({ gamePage: 0, joystickPage: 0 });

        _connection.peer = new SimplePeer({ initiator: local ===  'joystickPage'});

        _connection.peer.on('error', e => {
            userData.update({ joystickPage: 0, gamePage: 0 });
            console.log('error', err);
        })

        _connection.peer.on('signal', function (data) {
            console.log('SIGNAL', JSON.stringify(data))
            var update = {};
            update[remote] = data;
            userData.update(update);
        })

        userData.on('value', snapShot => {
            const value = snapShot.val();
            if (!value || !value[local]) { return }
            console.log(value);
            _connection.peer.signal(value[local]);
        });

        _connection.peer.on('connect', function () {
            console.log('CONNECT')
            userData.update({ joystickPage: 0, gamePage: 0 });
            _connection.peer.send('whatever' + Math.random())
        });

        _connection.peer.on('data', ondata);
    });

    return _connection;
}