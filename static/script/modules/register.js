modules.register = (() => {
    function registerForm() {
        const form = document.querySelectorAll('#form-register')[0];

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementsByName('email')[0].value;
            const password = document.getElementsByName('password')[0].value;
            const confirm_password = document.getElementsByName('confirm_password')[0].value;
            const admin = document.querySelectorAll('#form-register .admin')[0].checked;
            const user = document.querySelectorAll('#form-register .user')[0].checked;
            const mom = document.querySelectorAll('#form-register .mom').length != 0 ? document.querySelectorAll('#form-register .mom')[0].checked : false;
            const ryberg = document.querySelectorAll('#form-register .ryberg').length != 0 ? document.querySelectorAll('#form-register .ryberg')[0].checked : false;
            const demo = document.querySelectorAll('#form-register .demo')[0].checked;

            const dataObj = {
                email,
                password,
                confirm_password,
                permission: {
                    admin,
                    user,
                    mom,
                    ryberg,
                    demo
                }
            }

            // $.post('/register', data).then((res) => {
            //     console.log('Registered');
            //     window.location.href = '/';
            // }).fail((err, res) => {
            //     console.log(err);
            // });

            sendRegisterData(dataObj)

            function sendRegisterData(dataObj) {
                const data = dataObj;
                const xhr = new XMLHttpRequest();

                xhr.open('POST', '/register');
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        console.log(xhr)
                    }
                };

                xhr.send(JSON.stringify(data));

                xhr.onloadend = function() {
                    console.log('Done')
                    window.location.href = '/';
                };
            }
        });
    }

    return {
        init() {
            if (page === 'register') {
                registerForm();
            }
        }
    };
})();