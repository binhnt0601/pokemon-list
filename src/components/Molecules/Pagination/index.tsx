import React, { useEffect, useImperativeHandle, useState } from 'react';

import useViewPort from '../../../hooks/useViewPort';
import ReactPaginate from 'react-paginate';

export interface PaginationReference {
	setPage: React.Dispatch<React.SetStateAction<number>>;
	reset: () => void;
}

export interface Props {
	pageCount: number;
	pageRange?: number;
	defaultCurrentPage?: number;
	onPageChange?: (selectedPage: number) => void;
	pagSize?: number;
	total?: number;
	onChangePageSize?: (value: number) => void;
}

export const Pagination = React.forwardRef<PaginationReference, Props>(
	({ pageCount, pageRange, defaultCurrentPage, onPageChange }, ref) => {
		const { width } = useViewPort();
		const [currentPage, setCurrentPage] = useState(1);

		const onPageChangeFactory = (selectedItem: { selected: number }) => {
			const selectedPage = selectedItem.selected + 1;
			if (selectedPage === currentPage) return;
			setCurrentPage(selectedPage);

			if (!onPageChange) return;
			onPageChange(selectedPage);
		};

		useEffect(() => {
			setCurrentPage(defaultCurrentPage && defaultCurrentPage <= pageCount ? defaultCurrentPage : 1);
		}, [defaultCurrentPage, pageCount]);

		useImperativeHandle(
			ref,
			() => ({
				setPage: setCurrentPage,
				reset: () => {
					if (currentPage === 1) return;
					setCurrentPage(1);
				},
			}),
			[currentPage],
		);

		return (
			<div className="m-pagination">
					<ReactPaginate
						pageCount={pageCount}
						pageRangeDisplayed={width < 576 ? 2 : (pageRange as number)}
						marginPagesDisplayed={1}
						forcePage={currentPage - 1}
						previousLabel="<"
						nextLabel=">"
						breakLabel="..."
						containerClassName="m-pagination_pages"
						previousClassName="m-pagination_previous"
						nextClassName="m-pagination_next"
						pageClassName="m-pagination_page"
						activeClassName="m-pagination_page-active"
						onPageChange={onPageChangeFactory}
					/>
			</div>
		);
	},
);

Pagination.defaultProps = {
	pageRange: 5,
};
