modules.accounts = (() => {
    function deleteAccount() {
        let buttons = document.querySelectorAll('.account button');

        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i].onclick = function() {
                openModal(this);
            }
        }

        function sendDelete(button) {
            const accountID = String(button.dataset.id);
            const xhr = new XMLHttpRequest();

            xhr.open('POST', `/users/${accountID}`);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = () => {
                if (xhr.status === 200) {

                    try {
                        var response = JSON.parse(xhr.responseText);
                    } catch (e) {
                        var response = xhr.responseText
                    }

                    response.redirect ? window.location.href = '/' : console.log(response);
                }
            };

            xhr.send(accountID);
        }

        function removeAccountRow(button) {
            button.closest('.account').remove();
        }

        function openModal(button) {
            const modal = document.querySelectorAll('.modal-holder')[0];
            const template = Handlebars.templates['modals/delete']({
                data: {
                    modalHeader: 'Are you sure you want to delete this account?',
                    modalWarning: 'Warning: This cannot be undone.',
                    removeButton: 'Yes, remove account',
                    closeButton: 'Cancel'
                }
            });

            modal.innerHTML = template;

            const removeButton = document.querySelectorAll('.modal-block button.remove')[0];
            const closeButton = document.querySelectorAll('.modal-block button.close')[0];

            removeButton.onclick = (e) => {
                closeButton.closest('.modal-wrap').remove();
                removeAccountRow(button)
                sendDelete(button);
            }

            closeButton.onclick = (e) => {
                closeButton.closest('.modal-wrap').remove();
            }
        }
    }

    return {
        init() {
            if (page === 'accounts') {
                deleteAccount();
            }
        }
    };
})();
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
document.onreadystatechange = function() {
    const state = document.readyState;
    if (state == 'interactive') {
    	// Init js files
        modules.accounts.init();
        modules.alarm.init();
        modules.index.init();
        modules.register.init();
    } else if (state == 'complete') {
    	if (document.querySelectorAll('.menu-button').length) {
    		menu();
    	}
    }
};

function menu() {
	const menuButton = document.querySelectorAll('.menu-button')[0];
	const menu = document.querySelectorAll('.navigation-wrap')[0];

	menuButton.onclick = function() {
		if (menuButton.classList.contains('active')) {
			menuButton.classList.remove('active');
			menu.classList.remove('active');
		} else {
			menuButton.classList.add('active');
			menu.classList.add('active');
		}
	};
}
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modals/delete'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<h6 class=\"mb-4\"><u>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.modalWarning : stack1), depth0))
    + "</u></h6>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"modal-wrap\">\n	<div class=\"modal-block modal--delete\">\n		<div class=\"header text-center\">\n			<div>\n				<span class=\"icon-report\"></span>\n			</div>\n			<h4>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.modalHeader : stack1), depth0))
    + "</h4>\n		</div>\n		<div class=\"body\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.modalWarning : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<div class=\"d-flex justify-content-between\">\n				<button class=\"remove text-uppercase py-lg-2 px-lg-4 mr-2\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.removeButton : stack1), depth0))
    + "</button>\n				<button class=\"close\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.closeButton : stack1), depth0))
    + "</button>\n			</div>\n		</div>\n	</div>\n</div>";
},"useData":true});
templates['register/user-data'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: Admin</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: User</p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: Mom</p>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: Ryberg</p>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "<p class=\"mb-2\">Type of user: Demo</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<h2 class=\"mb-5\">User created</h2>\n<p class=\"mb-2\">Name: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.first_name : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "</p>\n<p class=\"mb-2\">Email: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.email : stack1), depth0))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.admin : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.user : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.mom : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.ryberg : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.permission : stack1)) != null ? stack1.demo : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();