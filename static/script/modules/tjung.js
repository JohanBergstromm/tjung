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