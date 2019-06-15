const path = require( 'path' );

const config = require("./node_modules/@wordpress/scripts/config/webpack.config");

config.entry = {
	edit: path.resolve( process.cwd(), 'src', 'edit.js' ),
	frontend: path.resolve( process.cwd(), 'src', 'frontend.js' ),
};

module.exports = config;
