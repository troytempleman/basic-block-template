// External dependencies
import classnames from 'classnames';

// WordPress dependencies
import { AlignmentToolbar, BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// Internal dependencies
import metadata from './block.json';
import icons from './icons';

// Editor and front end styles
import './style.scss';

// Editor styles
import './editor.scss';

// Get block name from json file
const { name } = metadata;

// Register block
registerBlockType( name, {
	
	// Icon
	icon: icons.block,
	
	// Edit
	edit: ( { attributes, setAttributes } ) => {	
		
		// Attributes
		const { textAlign, content } = attributes;
	
		// Wrapper 
		const wrapperAttributes = useBlockProps( {
			className: classnames( {
				[ `has-text-align-${ textAlign }` ]: textAlign,
			} ),
		} );
	
		return (
			<>
				<BlockControls >
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( value ) => setAttributes( { textAlign: value } ) }
					/>
				</BlockControls>
				<RichText
					{ ...wrapperAttributes }
					tagName="div"
					value={ content }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					placeholder={ __( 'Add content', 'basic-block-template' ) }
					onChange={ ( value ) => setAttributes( { content: value } ) }
				/>
			</>
		);
    },
	
	// Save
    save: ( { attributes } ) => {	
		
		// Attributes
		const { textAlign, content } = attributes;
	
		// Wrapper 
		const wrapperAttributes = useBlockProps.save( {
			className: classnames( {
				[ `has-text-align-${ textAlign }` ]: textAlign,
			} ),
		} );

		return (
			<RichText.Content
				{ ...wrapperAttributes }
				tagName="div"
				value={ content }
			/>
		);
    }
	
} );
