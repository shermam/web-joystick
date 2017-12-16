Array.from(document.querySelectorAll('.action-button'))
    .forEach(b => {
        ['touchenter', 'touchstart']
            .forEach(evName => {
                b.addEventListener(evName, e => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.vibrate(50);
                });
            });
    });

document.querySelector('#login')
    .addEventListener('click', e => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(console.log);
    });