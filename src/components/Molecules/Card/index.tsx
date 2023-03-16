import React from 'react';
import { mapModifiers } from '../../../utils/component';
import { Image } from '../../Atoms/Image';
import { Loading } from '../../Atoms/Loading';


type Modifier = 'foo' | 'bar';

export interface Props {
	title: string;
	src?: string;
	isLoading?: boolean;
	modifiers?: Modifier | Array<Modifier>;
}

export const Card: React.FC<Props> = ({ title, src, isLoading, modifiers }) => (
	<div className={mapModifiers('m-card', modifiers)}>
		{isLoading ?  <Loading /> : <Image aspectRatio="1x1" src={src} alt={title} />}
		{title && <span>{title}</span>}
	</div>
);
