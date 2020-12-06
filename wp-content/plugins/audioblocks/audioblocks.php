<?php
/*
Plugin Name: Page Soundtrack Blocks
Version: 0.0.4
Plugin URI: https://github.com/haszari/wcbne-audio-blocks/
Description: Add a dynamic bpm-synched soundtrack to your pages or posts.
Author: haszari@cartoonbeats.com
Text Domain: cbr-pagesoundtrack
*/

// Register a custom category for our blocks.
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

// Enqueue front end styles for our blocks.
function pagesoundtrack_enqueue_view_styles() {
	wp_enqueue_style(
		'pagesoundtrack_frontend_style',
		plugins_url( 'src/style/frontend.css', __FILE__ )
	);
}

// Enqueue front end scripts and styles for our blocks.
function pagesoundtrack_enqueue_view_assets() {
	// This script implements the front-end playback behaviour.
	wp_enqueue_script(
		'pagesoundtrack_view',
		plugins_url( 'build/frontend.js', __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . 'build/frontend.js' )
	);

	pagesoundtrack_enqueue_view_styles();
}
add_action( 'wp_enqueue_scripts', 'pagesoundtrack_enqueue_view_assets' );

// Enqueue editor scripts and styles for our blocks.
function pagesoundtrack_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'pagesoundtrack_editor',
		plugins_url( 'build/blocks.js', __FILE__ ),
		[
			'wp-blocks',
			'wp-block-editor',
			'wp-components',
			'wp-compose',
			'wp-data',
			'wp-element',
		],
		filemtime( plugin_dir_path( __FILE__ ) . 'build/blocks.js' )
	);

	wp_enqueue_style(
		'pagesoundtrack_editor_style',
		plugins_url( 'src/style/editor.css', __FILE__ )
	);

	pagesoundtrack_enqueue_view_styles();
}
add_action( 'enqueue_block_editor_assets', 'pagesoundtrack_enqueue_block_editor_assets' );

// Register a meta field that our blocks depend on.
// It needs to be exposed to REST API so the value is available in Gutenberg environment.
function pagesoundtrack_blocks_init() {
    register_post_meta(
    	'', // Register for all post types - posts and pages.
    	'pagesoundtrack_playbackbpm',
    	array(
	        'show_in_rest' => true,
	        'single' => true,
	        'type' => 'number',
	    )
    );
}
add_action( 'init', 'pagesoundtrack_blocks_init' );

// Render our page tempo value so we can use it in our front-end script.
function pagesoundtrack_blocks_content_filter( $content ) {
	if ( ! is_singular() ) {
		// Only render tempo element for single-post pages, to disable soundtrack on
		// archives etc.
		return $content;
	}

    $value = get_post_meta( get_the_ID(), 'pagesoundtrack_playbackbpm', true );
    if ( $value ) {
    	$cleaned = esc_html( $value );
        return "<span id='page-soundtrack-tempo' data-page-soundtrack-tempo='$cleaned'></span> $content";
    } else {
        return $content;
    }
}
add_filter( 'the_content', 'pagesoundtrack_blocks_content_filter' );
