modules.index = (() => {
    function login() {
        const slideButton = document.querySelectorAll('.slide-button')[0];
        const button = document.querySelectorAll('.slide-button input')[0];

        button.onchange = (e) => {
            e.preventDefault();


            const alarmState = document.querySelectorAll('.slide-button input')[0].checked;

            //Set alarm state in database
            // const xhr = new XMLHttpRequest();

            // xhr.open('PUT', '/alarms/:id');
            // xhr.setRequestHeader('Content-Type', 'application/json');

            // xhr.onload = () => {
            //     if (xhr.status === 200) {
            //         console.log(xhr);
            //     }
            // };

            // xhr.send(JSON.stringify(data));

            // xhr.onloadend = () => {
            //     console.log('State updated');
            // }

            if (slideButton.classList.contains('on')) {
                slideButton.classList.remove('on');
                button.checked = false;
            } else {
                button.checked = true;
                slideButton.classList.add('on');
            }
        }

        slideButton.classList.contains('on') ? button.checked = true : button.checked = false;
    }

    return {
        init() {
            if (page === 'index') {
                login();
            }
        }
    };
})();