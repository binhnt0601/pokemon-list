import React from 'react';

import { mapModifiers } from '../../../utils/component';

export type IconName = 'green-loading';

export interface Props {
	iconName: IconName;
	size?: number;
	clickable?: boolean;
	onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const Icon: React.FC<Props> = ({ iconName, size, clickable, onClick }) => (
	<span
		className={mapModifiers('a-icon', iconName, clickable && 'clickable')}
		style={{ width: size, height: size }}
		aria-hidden
		onClick={clickable ? onClick : undefined}
	/>
);

Icon.defaultProps = {
	size: 24,
};
