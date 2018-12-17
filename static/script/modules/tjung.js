document.onreadystatechange = function() {
    const state = document.readyState;
    if (state == 'interactive') {
    	// Init js files
        modules.register.init();
        modules.accounts.init();
    } else if (state == 'complete') {

    }
};