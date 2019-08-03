const path = require( 'path' );

const config = require( './node_modules/@wordpress/scripts/config/webpack.config' );

config.entry = {
	blocks: path.resolve( process.cwd(), 'src', 'blocks.js' ),
	frontend: path.resolve( process.cwd(), 'src', 'frontend.js' ),
};

module.exports = config;
