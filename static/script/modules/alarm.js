modules.alarm = (() => {
    function setAlarm() {
        const alarm = document.querySelectorAll('.alarm')[0];
        const button = document.querySelectorAll('.alarm input')[0];
        const alarmID = String(button.dataset.id);

        button.onchange = (e) => {
            e.preventDefault();

            const alarmState = document.querySelectorAll('.alarm input')[0].checked;
            const data = {
                state: alarmState,
                id: alarmID
            }

            //Set alarm state in database
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', '/alarms/:id');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log(xhr);
                }
            };

            xhr.send(JSON.stringify(data));

            xhr.onloadend = () => {
                console.log('State updated');
            }

            if (alarm.classList.contains('on')) {
                alarm.classList.remove('on');
                button.checked = false;
            } else {
                button.checked = true;
                alarm.classList.add('on');
            }

            spotify();
        }

        alarm.classList.contains('on') ? button.checked = true : button.checked = false;

        spotify();
    }

    async function spotify() {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/alarm/spotify');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log('Success');
            }

            if (xhr.status >= 400) {
                const response = JSON.parse(xhr.responseText);
                const error = response.error;

                console.log(error.message);
            }
        };

        xhr.send();

        xhr.onloadend = () => {
            console.log('Done');
        }
    }

    return {
        init() {
            if (page === 'alarm') {
                setAlarm();
            }
        }
    };
})();