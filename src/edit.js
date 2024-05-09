/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useSelect, select } from '@wordpress/data';
import { store } from '@wordpress/blocks';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {

	// Gets all paragraph blocks from editor
	const paragraphBlocks = useSelect((select) => select('core/block-editor').getBlocks().filter((block) => block.name === 'core/paragraph'), []);
	
	// Calculates the total word count of all paragraph blocks in editor
	const totalCount = paragraphBlocks.reduce((acc, block) => {
		// Gets the text content from block
		const blockContent = select('core/block-editor').getBlocksByClientId(block.clientId)[0].attributes.content;

		// Counts number of words in paragraph block content
		const wordCount = blockContent.split(/\s+/).filter(Boolean).length;

		return acc + wordCount;
	}, 0);
	
	// Calulates reading time by dividing word count by 200 words per minute and rounding up to nearest integer
	// Source: https://infusion.media/content-marketing/how-to-calculate-reading-time/
	const readingTime = Math.ceil(totalCount / 200);

    return (
        <p { ...useBlockProps() }>{`${readingTime} min read`}</p>
    );
}
