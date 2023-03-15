import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import IndexRoutes from './routes';

import './index.scss';
import client from './services/client';

function App() {
  return (
			<ApolloProvider client={client}>
        <BrowserRouter>
          <IndexRoutes />
        </BrowserRouter>
			</ApolloProvider>
  );
}

export default App;
