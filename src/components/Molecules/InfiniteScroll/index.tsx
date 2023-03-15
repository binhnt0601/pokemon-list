import React from 'react';

import { Loading } from '../../Atoms/Loading';
import { Text } from '../../Atoms/Text';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface Props {
	limit: number;
	hasMore?: boolean;
	isLoading?: boolean;
	scrollableTarget?: string;
	endMessage?: string;
	onLoadMore: () => Promise<void>;
	children?: React.ReactNode;
}

export const InfinityScroll: React.FC<Props> = ({
	limit,
	endMessage,
	scrollableTarget,
	isLoading,
	hasMore = false,
	onLoadMore,
	children,
}) => {
	return (
		<div className="m-infinitescroll">
			<InfiniteScroll
				dataLength={limit}
				next={onLoadMore}
				hasMore={hasMore || isLoading || false}
				loader={
					<div style={{ marginTop: 20, textAlign: 'center' }}>
						<Loading />
					</div>
				}
				endMessage={
					<Text textAlign="center" fontWeight="bold">
						{endMessage}
					</Text>
				}
				scrollableTarget={scrollableTarget}
			>
				{children}
			</InfiniteScroll>
		</div>
	);
};
