<?php
/*
Plugin Name: Audio Blocks
*/

add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'audioblocks',
				'title' => __( 'Audio Blocks', 'audioblocks' ),
			],
		]
	);
}, 10, 2 );

function audioblocks_enqueue_view_script() {
	wp_enqueue_script(
		'audioblocks_view',
		plugins_url( 'build/frontend.js', __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . 'build/frontend.js' )
	);
}
add_action( 'wp_enqueue_scripts', 'audioblocks_enqueue_view_script' );

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

	audioblocks_enqueue_view_script();
}
add_action( 'enqueue_block_editor_assets', 'audioblocks_enqueue_block_editor_assets' );

