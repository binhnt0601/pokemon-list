import React from 'react';

import {
	Row as RowBootstrap,
	Col as ColBootstrap,
	RowProps,
	ColProps,
} from 'react-bootstrap';

export const Row: React.FC<RowProps> = ({ as, bsPrefix, children, className, xl, lg, md, sm, xs }) => (
	<RowBootstrap
		as={as}
		bsPrefix={bsPrefix}
		className={className}
		xl={xl}
		lg={lg}
		md={md}
		sm={sm}
		xs={xs}
	>
		{children}
	</RowBootstrap>
);

export const Col: React.FC<ColProps> = ({ as, bsPrefix, children, className, xl, lg, md, sm, xs }) => (
	<ColBootstrap as={as} bsPrefix={bsPrefix} className={className} xl={xl} lg={lg} md={md} sm={sm} xs={xs}>
		{children}
	</ColBootstrap>
);
