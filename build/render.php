<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
 // Calculates words in post/page
 $words_count = str_word_count(get_the_content());
 // Calulates reading time by dividing word count by 200 words per minute and rounding up to nearest integer
 $reading_time = ceil($words_count/200);
?>

<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e($reading_time . " min read", 'reading-time-block' ); ?>
</p>