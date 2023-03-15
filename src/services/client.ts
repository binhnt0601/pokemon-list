import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
// import { ApiBaseUrl } from 'config';

const httpLink = createUploadLink({ uri: process.env.REACT_APP_API_BASE_URL }) as unknown as ApolloLink;

const client = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false,
	}),
	link: from([httpLink]),
});

export default client;
