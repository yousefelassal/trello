import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useTokenValue } from '@/hooks/useTokenValue'

interface Props {
  children: React.ReactNode
}

const ApolloProvider = ({children}:Props) => {
  const { token } = useTokenValue()
  const authLink = setContext((_, { headers }) => {
    return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : null,
        }
    }
  })
  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_SERVER,
  })
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })

  return (
    <Provider client={client}>
      {children}
    </Provider>
  )
}

export default ApolloProvider