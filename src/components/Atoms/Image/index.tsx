import React from 'react';

import { mapModifiers } from '../../../utils/component';

type Ratio = '1x1';

export interface Props {
	src?: string;
	alt?: string;
	lazy?: boolean;
	aspectRatio?: Ratio;
}

export const Image: React.FC<Props> = ({ src, alt, aspectRatio, lazy }) => (
	<div className={mapModifiers('a-image', aspectRatio, aspectRatio ? 'fixed' : undefined)}>
		<img className="a-image_img" loading={lazy ? 'lazy' : undefined} src={src} alt={alt} />
	</div>
);

Image.defaultProps = {
	lazy: true,
	aspectRatio: '1x1'
};
