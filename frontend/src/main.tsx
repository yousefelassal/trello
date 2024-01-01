import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import ApolloProvider from './components/ApolloProvider.tsx'
import { Provider } from 'jotai'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <ApolloProvider>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </Provider>
)
