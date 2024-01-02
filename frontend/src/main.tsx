import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import ApolloProvider from './components/ApolloProvider.tsx'
import { Provider } from 'jotai'
import { Provider as TextProvider } from 'react-wrap-balancer'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <ApolloProvider>
      <Router>
        <TextProvider>
          <App />
        </TextProvider>
      </Router>
    </ApolloProvider>
  </Provider>
)
