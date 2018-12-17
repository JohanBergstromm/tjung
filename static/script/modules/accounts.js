modules.accounts = (() => {
    function deleteAccount() {
        let buttons = document.querySelectorAll('.account button');

        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i].onclick = function() {
                sendDelete(this);
            }
        }

        function sendDelete(button) {
            const accountID = String(button.dataset.id);
            const xhr = new XMLHttpRequest();

            xhr.open('POST', `/users/${accountID}`);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = function() {
                if (xhr.status === 200) {
                    var responseText = xhr.responseText;
                    console.log(responseText)
                }
            };

            xhr.send(accountID);
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