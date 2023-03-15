import { useState } from 'react';

import { AxiosInstance } from 'axios';

export const useMakeRequest = <D, R>({
	requestInstance,
	method = 'GET',
	url,
	params,
	data,
}: {
	requestInstance: AxiosInstance;
	method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
	url?: string;
	params?: R;
	data?: D;
}) => {
	const [result, setResult] = useState<D>();
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	// eslint-disable-next-line consistent-return
	const request = async ({ _params, _url }: { _params?: R; _url?: string }) => {
		try {
			setLoading(true);
			let requestParams: any = params;
			const urlRequest = url || _url || '';
			if (_params) {
				requestParams = _params;
			}

			let response = null;
			switch (method) {
				case 'GET':
					response = await requestInstance.get<D>(urlRequest, requestParams);
					break;
				case 'POST':
					response = await requestInstance.post<D>(urlRequest, data, requestParams);
					break;
				case 'PUT':
					response = await requestInstance.put<D>(urlRequest, data, requestParams);
					break;
				case 'DELETE':
					response = await requestInstance.delete<D>(urlRequest, requestParams);
					break;
				default:
					throw new Error('Invalid method');
			}

			setResult(response?.data);
			setLoading(false);
			return response?.data;
		} catch (err) {
			if (err) {
				setError(
					(
						err as {
							response: {
								data: {
									message: string;
								};
							};
						}
					)?.response?.data?.message || 'Something went wrong',
				);
			}
			setLoading(false);
		}
	};

	return {
		loading,
		result,
		error,
		request,
	};
};
