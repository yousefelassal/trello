import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import 'dotenv/config'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('trello-3al-daya2-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: process.env.SERVER,
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
