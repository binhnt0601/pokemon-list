import React from 'react';

import { mapModifiers } from '../../../utils/component';

type FontWeight = 'medium' | 'bold';
type TextSize = 'small';
export type TextColor =
	| 'grape'
	| 'violet-blue'
	| 'secondary'
	| 'danger'
	| 'disabled'
	| 'warning'
	| 'mark'
	| 'success'
	| 'link';
type TextAlign = 'center' | 'left' | 'right' | 'justify';
type FontStyle = 'underline' | 'strikethrough' | 'italic';

export interface Props {
	fontWeight?: FontWeight;
	typeSize?: TextSize;
	textAlign?: TextAlign;
	fontStyle?: FontStyle;
	textColor?: TextColor;
	children?: React.ReactNode;
}
export const Text: React.FC<Props> = ({ children, fontWeight, typeSize, textAlign, fontStyle, textColor }) => (
	<p
		className={mapModifiers(
			'a-text',
			fontWeight && `font-weight-${fontWeight}`,
			typeSize && `size-${typeSize}`,
			fontStyle,
			textAlign,
			textColor,
		)}
	>
		{children}
	</p>
);
