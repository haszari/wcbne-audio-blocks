<?php
/*
Plugin Name: Page Soundtrack Blocks
Version: 0.0.2
Plugin URI: https://github.com/haszari/wcbne-audio-blocks/
Description: Add a dynamic bpm-synched soundtrack to your pages or posts.
Author: haszari@cartoonbeats.com
Text Domain: cbr-pagesoundtrack
*/

add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'soundtrack',
				'title' => __( 'Soundtrack', 'cbr-pagesoundtrack' ),
			],
		]
	);
}, 10, 2 );

function audioblocks_enqueue_view_assets() {
	wp_enqueue_script(
		'audioblocks_view',
		plugins_url( 'build/frontend.js', __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . 'build/frontend.js' )
	);

	wp_enqueue_style(
		'audioblocks_frontend_style',
		plugins_url( 'src/style/frontend.css', __FILE__ )
	);
}
add_action( 'wp_enqueue_scripts', 'audioblocks_enqueue_view_assets' );

function audioblocks_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'audioblocks_editor',
		plugins_url( 'build/edit.js', __FILE__ ),
		[
			'wp-blocks',
			'wp-block-editor',
			'wp-components',
			'wp-compose',
			'wp-data',
			'wp-element',
		],
		filemtime( plugin_dir_path( __FILE__ ) . 'build/edit.js' )
	);

	wp_enqueue_style(
		'audioblocks_editor_style',
		plugins_url( 'src/style/editor.css', __FILE__ )
	);

	audioblocks_enqueue_view_assets();
}
add_action( 'enqueue_block_editor_assets', 'audioblocks_enqueue_block_editor_assets' );

