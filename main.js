Array.from(document.querySelectorAll('button'))
    .forEach(b => {
        // b.addEventListener('touchmove', e => {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     navigator.vibrate(50);
        // });

        b.addEventListener('touchstart', e => {
            e.stopPropagation();
            e.preventDefault();
            navigator.vibrate(50);
        });

    });