(function () {

    'use strict';

    const { execSync } = require('child_process');

    module.exports = exports = { address };

    function address () {
        return execSync('curl -s ifconfig.me').toString().trim();
    }

})();