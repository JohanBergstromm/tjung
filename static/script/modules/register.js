modules.register = (() => {
    function registerForm() {
        const form = document.querySelectorAll('#form-register')[0];
        const userDetailsWrap = document.querySelectorAll('.user-created')[0];

        form.onsubmit = async (e) => {
            e.preventDefault();

            const email = document.getElementsByName('email')[0].value;
            const password = document.getElementsByName('password')[0].value;
            const confirm_password = document.getElementsByName('confirm_password')[0].value;
            const first_name = document.getElementsByName('fname')[0].value;
            const last_name = document.getElementsByName('lname')[0].value;
            const admin = document.querySelectorAll('#form-register .admin')[0].checked;
            const user = document.querySelectorAll('#form-register .user')[0].checked;
            const mom = document.querySelectorAll('#form-register .mom').length != 0 ? document.querySelectorAll('#form-register .mom')[0].checked : false;
            const ryberg = document.querySelectorAll('#form-register .ryberg').length != 0 ? document.querySelectorAll('#form-register .ryberg')[0].checked : false;
            const demo = document.querySelectorAll('#form-register .demo')[0].checked;

            const data = {
                email,
                password,
                confirm_password,
                first_name,
                last_name,
                permission: {
                    admin,
                    user,
                    mom,
                    ryberg,
                    demo
                }
            }

            const fetchOpt = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                method: 'POST'
            }

            try {
                const request = await fetch('/register', fetchOpt);
                const responseJSON = await request.json();

                var template = Handlebars.templates['register/user-data']({
                    data: responseJSON
                });

                userDetailsWrap.innerHTML = template;

                form.classList.add('hidden');

                setTimeout(() => {
                    form.classList.add('d-none')
                    userDetailsWrap.classList.remove('d-none')
                    userDetailsWrap.classList.remove('hidden')
                }, 300);

            } catch (err) {
                console.log(err)
            }
        };
    }

    return {
        init() {
            if (page === 'register') {
                registerForm();
            }
        }
    };
})();