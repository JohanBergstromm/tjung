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