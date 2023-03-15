import React from 'react';
import { mapModifiers } from '../../../utils/component';
import { Image } from '../../Atoms/Image';


type Modifier = 'foo' | 'bar';

export interface Props {
	title: string;
	src?: string;
	modifiers?: Modifier | Array<Modifier>;
}

export const Card: React.FC<Props> = ({ title, src, modifiers }) => (
	<div className={mapModifiers('m-card', modifiers)}>
		<Image aspectRatio="1x1" src={src} alt={title} />
		{title && <span>{title}</span>}
	</div>
);
