<div align="center">

[![README-IMG](https://github.com/yousefelassal/trello/assets/76617202/ed091da0-bd40-4911-a6b5-307af27d2136)](https://trello-3al-day2.vercel.app)

</div>

[Check the Docs on the deployed version a7san](https://trello-3al-daya2.vercel.app/#/documentation)

<h2 className="text-2xl font-semibold">Client State</h2>

A custom hook was created to get the user token on first render from local storage and set the token value on login and signup using `jotai` util <span className="underline">[`atomWithStorage`](https://jotai.org/docs/utilities/storage)</span>


```ts useTokenValue.ts mark=4[20:34],7[29:35]
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const tokenValue = atomWithStorage<string | null>('trello-3al-daya2-token', null)

export const useTokenValue = () => {
  const [token, setToken] = useAtom(tokenValue)

  return {
    token,
    setToken
  }
}
```

```tsx App.tsx focus=1,4,6[7:12],14,15
import { useTokenValue } from "./hooks/useTokenValue";

function App() {
  const { token, setToken } = useTokenValue()

  if (token) {
    return (
      // user is logged in and dashboard is rendered
    )
  }

  return (
    // user is not logged in and landing page is rendered with login and signup
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/signup" element={<Signup setToken={setToken} />} />
  );
}

```

<h2 className="text-2xl font-semibold">Server State</h2>

Server state was handled using <span className="underline">[Apollo Client](https://www.apollographql.com/docs/react/)</span>

```tsx main.tsx
import ReactDOM from 'react-dom/client'
import ApolloProvider from './components/ApolloProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
```
A custom [ApolloProvider](focus://2,5,9) component was created to wrap the app with the apollo client and set the authorization header with the user token from local storage

<br />

<h3 className="text-lg font-semibold">Using Token</h3>

`useTokenValue` is imported and used to get the user token

```tsx ApolloProvider.tsx focus=1,8
import { useTokenValue } from '@/hooks/useTokenValue'

interface Props {
  children: React.ReactNode
}

const ApolloProvider = ({children}:Props) => {
  const { token } = useTokenValue()

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
```

---

<h3 className="text-lg font-semibold">User Context</h3>

`setContext` is used to set the authorization header with the user token


```tsx ApolloProvider.tsx focus=1,10:17
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
```

---

<h3 className="text-lg font-semibold">Apollo Client</h3>

The apollo client is created with the `authLink` created and `httpLink` from the server uri which is set in the `.env` file according to the environment (development or production)


```tsx ApolloProvider.tsx focus=1:6,24:37
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
```

---

```env .env
VITE_SERVER=http://localhost:4000/graphql
```

<h2 className="text-2xl font-semibold">Creating a new Board</h2>

<br />

<img
  src="https://utfs.io/f/6eab8aeb-9a8f-429d-85b6-d80f88a18c53-74p8et.PNG"
  alt="Create Board Modal"
  className="rounded-lg shadow-lg"
/>

<h3 className="text-lg font-semibold">Unsplash API</h3> 

Custom hook `useRandomPhotos` is created to fetch random photos from <span className="underline">[Unsplash API](https://unsplash.com/documentation#get-a-random-photo)</span> returning the photos array, with loading and error state

```tsx useRandomPhotos.tsx
import { useState, useEffect } from 'react'

const useRandomPhotos = () => {
    const [data, setData] = useState<any>([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setData([])
        fetch(`https://api.unsplash.com/photos/random
          ?client_id=${import.meta.env.VITE_ACCESS_KEY}
          &count=4
          &topics=minimalism,wallpapers,nature,textures-patterns`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
            })
    }, [])

    return {
        photos: data.map((photo) => photo.urls.regular),
        error,
        isLoading
    }
}

export default useRandomPhotos
```

---

Selecting the topics and count from the API

```tsx useRandomPhotos.tsx focus=11:14

```

---

Handling Errors with hardcoded data (Unsplash API has a limit of 50 requests per hour)


```tsx useRandomPhotos.tsx focus=3:16,35:39,44
import { useState, useEffect } from 'react'

const dataIfError = [
    {
        "id": "0z-sWoAqs0c",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=85",
            "regular": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=1080",
            "small": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=400",
            "thumb": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=200",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1704500355467-88351c0797c3"
        },
        // ...
    }
]

const useRandomPhotos = () => {
    const [data, setData] = useState<any>([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setData([])
        fetch(`https://api.unsplash.com/photos/random
          ?client_id=${import.meta.env.VITE_ACCESS_KEY}
          &count=4
          &topics=minimalism,wallpapers,nature,textures-patterns`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
                setData(dataIfError)
            })
    }, [])

    return {
        photos: data.map((photo) => photo.urls.regular),
        error,
        isLoading
    }
}

export default useRandomPhotos
```

---

Handling background selection

```tsx useRandomPhotos.tsx focus=22:26,49,50
import { useState, useEffect } from 'react'

const dataIfError = [
    {
        "id": "0z-sWoAqs0c",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=85",
            "regular": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=1080",
            "small": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=400",
            "thumb": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=200",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1704500355467-88351c0797c3"
        },
        // ...
    }
]

const useRandomPhotos = () => {
    const [data, setData] = useState<any>([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedBg, setSelectedBg] = useState('')

    const handleBgChange = (bg: string) => {
        setSelectedBg(bg)
    }

    useEffect(() => {
        setIsLoading(true)
        setData([])
        fetch(`https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_ACCESS_KEY}&count=4&topics=minimalism,wallpapers,nature,textures-patterns`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setSelectedBg(data[0].urls.regular)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
                setData(dataIfError)
            })
    }, [])

    return {
        photos: data.map((photo) => photo.urls.regular),
        error,
        isLoading,
        selectedBg,
        handleBgChange
    }
}

export default useRandomPhotos
```

---

Using the hook


```tsx useRandomPhotos.tsx
import { useState, useEffect } from 'react'

const dataIfError = [
    {
        "id": "0z-sWoAqs0c",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=85",
            "regular": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=1080",
            "small": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=400",
            "thumb": "https://images.unsplash.com/photo-1704500355467-88351c0797c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc0MTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ4OTE3NzV8&ixlib=rb-4.0.3&q=80&w=200",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1704500355467-88351c0797c3"
        },
        // ...
    }
]

const useRandomPhotos = () => {
    const [data, setData] = useState<any>([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedBg, setSelectedBg] = useState('')

    const handleBgChange = (bg: string) => {
        setSelectedBg(bg)
    }

    useEffect(() => {
        setIsLoading(true)
        setData([])
        fetch(`https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_ACCESS_KEY}&count=4&topics=minimalism,wallpapers,nature,textures-patterns`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setSelectedBg(data[0].urls.regular)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
                setData(dataIfError)
            })
    }, [])

    return {
        photos: data.map((photo) => photo.urls.regular),
        error,
        isLoading,
        selectedBg,
        handleBgChange
    }
}

export default useRandomPhotos
```

---

```tsx AddBoard.tsx
import useRandomPhotos from "@/hooks/useRandomPhotos";

export default function AddBoard() {
  const { photos, isLoading, selectedBg, handleBgChange } = useRandomPhotos()

  return (
  {isLoading && (
      // Skeleton
  )}
  { !isLoading && (
      <div className="w-full flex-1 flex items-center flex-col gap-4">
          <div className="relative rounded-lg h-36 w-48 overflow-hidden">
              <img src={selectedBg} alt="" className="object-cover absolute w-full h-full shadow-md" />
              <Placeholder />
          </div>
          <div className="flex gap-2">
              {photos.map((bg, i) => (
                  <button
                      key={i}
                      className={cn('relative group rounded-md h-12 w-16 overflow-hidden transition', selectedBg === bg ? 'ring-2 ring-blue-500' : '')}
                      onClick={() => handleBgChange(bg)}
                  >
                      {selectedBg === bg && (
                          <div className="absolute z-20 inset-0 flex items-center justify-center">
                              <Check className="text-white/80 w-5 h-5" />
                          </div>
                      )}
                      <div className={cn("absolute hidden group-hover:block z-10 inset-0 bg-black/40 items-center justify-center", selectedBg === bg && 'block')} />
                      <img src={bg} alt="" className="object-cover absolute inset-0 w-full h-full shadow-md" />
                  </button>
              ))}
          </div>
      </div>
  )}
  )
}
```

<br />
<h3 className="text-lg font-semibold">Mutation and Updating the Cache</h3>


```graphql create-board.mutation.graphql
mutation createBoard($title: String!, $description: String, $bg:String!){
  createBoard(title: $title, description: $description, bg:$bg){
    id
    title
    description
    bg
    updated_at
    saved
  }
}
```

```tsx AddBoard.tsx
import { useMutation } from "@apollo/client"
import {
    CreateBoardDocument,
    CreateBoardMutationVariables,
    CreateBoardMutation,
    AllBoardsDocument
} from "@/generated/graphql"
import { useNavigate } from "react-router-dom";

export default function AddBoard() {
  const navigate = useNavigate()
    
  const [createBoard] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, {
      onCompleted(data) {
          if (data.createBoard) {
              navigate(`/${data.createBoard.id}`)
          }
      },
      update: (cache, response) => {
          cache.updateQuery({ query: AllBoardsDocument }, (data) => {
              if (response.data?.createBoard) {
                  return {
                      allBoards: [response.data.createBoard, ...data.allBoards]
                  }
              }
              return data
          })
      }
  })
}
```
when mutation is completed `useNavigate` is used to redirect the user to the new board page and cache is immutably updated with the new board data using `updateQuery` on a successful response

<br />
<h2 className="text-2xl font-semibold">Using <span className="underline">[Codegen](https://the-guild.dev/graphql/codegen)</span> to generate typed queries and mutations</h2>


```bash
npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-graphql-request @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

<h3 className="font-semibold">This will install the following packages as `devDepencencies`</h3>

<ul className="list ml-8">
<li>`@graphql-codegen/cli`</li>
<li>`@graphql-codegen/typescript`</li>
<li>`@graphql-codegen/typescript-graphql-request`</li>
<li>`@graphql-codegen/typescript-operations`</li>
<li>`@graphql-codegen/typescript-react-apollo`</li>
</ul>


```yml graphql.config.yml
schema:
  - "http://localhost:4000/"
documents:
  - "./src/graphql/*.graphql"
generates:
  ./src/generated/graphql.ts:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
```

<h3 className="font-semibold">The configuration file does the following:</h3>

<ul className="list ml-8">
<li>`schema` points to our GraphQL endpoint for fetching the API schema map.</li>
<li>`documents` tells GraphQL Codegen where to look for our schema files.</li>
<li>`generates` tells GraphQL Codegen where to create and store generated code.</li>
<li>`plugins` Specifies what GraphQL Codegen plugins to use.</li>
</ul>


```json package.json
{
  "scripts": {
    "generate": "graphql-codegen --config graphql.config.yml",
    "predev": "npm run generate"
  }
}
```

The `generate` script will run the codegen and generate the types in `./src/generated/graphql.ts`

<br />
<h2 className="text-2xl font-semibold">Optimistic UI</h2>

Handling optimistic updates was the most challenging part of the project, as it would feel weird when the user move or create a card/list and it disappears and reappears again after the response is received from the server.

It was achieved by passing the `optimisticResponse` object to the mutation options to the `useMutation` hook.


```tsx Board.tsx
const [addList] = useMutation<AddListMutation, AddListMutationVariables>(AddListDocument,{
  optimisticResponse: {
    __typename: "Mutation",
    addList: {
      __typename: "Board",
      id: id as string,
      title: data?.findBoard?.title as string,
      bg: data?.findBoard?.bg as string,
      description: data?.findBoard?.description as string,
      lists: [
        ...data?.findBoard?.lists as any[] || [],
        {
            __typename: "List",
            id: `temp-${Date.now()}`,
            title: listTitle,
            cards: []
        }
      ]
    }
  }
})
```

when the mutation happens the optimistic response is cached with a separate cache identifier to insure that our cached data remains accurate if the mutation fails,
and eventually when the server responds with the _actual_ resulting object the optimistic version is removed.

A temporary `id` is provided to be able to identify the object which is then replaced with the actual `id` from the server response.
This technique was used for most mutations in the project.

<br />
<h2 className="text-2xl font-semibold">Drag and Drop</h2>

Drag and drop was implemented using <span className="underline">[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)</span> library which is maintained and relied on by Atlassian the company behind Trello.

I highly recommend this course by <span className="underline">[Alex Reardon](https://twitter.com/alexandereardon)</span> the creator of the library.
<br/>
<img src="https://og-image-react-egghead.vercel.app/playlists/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd?v=20201103" alt="egghead react-beautiful-dnd course" className="rounded-lg shadow-lg" />
<div align="center">
  <a href="https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd" className="text-blue-500 underline">egghead react-beautiful-dnd course</a>
</div>


<br />
<h2 className="text-2xl font-semibold">Dynamic Routes for Card Modals</h2>
<br />
<img src="https://utfs.io/f/3812f97a-99cc-4d32-a7cb-11c5f343e410-7ce0k0.PNG" alt="card modal" className="rounded-lg shadow-lg" /

<h3 className="text-lg font-semibold">Displaying modal as an overlay</h3>

<p className="text-sm">When a modal is opened, the previous location is passed to `<Routes/>` instead of using the current location by default.</p>

```tsx App.tsx focus=3,4,9,14:18
export default function App() {
  const {token, setToken} = useTokenValue()
  const location = useLocation()
  const previousLocation = location.state?.previousLocation
  
  if (token) {
    return(
      <>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Board />} />
      </Routes>

      {previousLocation && (
        <Routes>
          <Route path="/:id/:id" element={<CardModal previousLocation={previousLocation} />} />
        </Routes>
      )}
      </>
    )
  }

  return (
    // ...
  )
}

```

---

<h3 className="text-lg font-semibold">CardModal Component</h3>

<p className="text-sm">`useNavigate` Hook is used to redirect to the Board page when the modal is closed.</p>

```tsx CardModal.tsx
import { useNavigate } from 'react-router-dom';

export function CardModal({previousLocation}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${previousLocation.pathname}`)}
    >
      <div
        onClick={e => e.stopPropagation()}
      >
        {/* Content */}
      </div>
    </div>
  );
}
```

---

<h3 className="text-lg font-semibold">Preventing the scroll underneath the modal</h3>

<p className="text-sm">
Using <span className="underline">[body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock)</span> `disableBodyScroll` and `enableBodyScroll` functions when the modal component is mounted and unmounted, respectively. 
</p>


```tsx CardModal.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export function CardModal({previousLocation}) {
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const observerRefValue = modalRef.current;
    disableBodyScroll(observerRefValue);
    return () => {
      if (observerRefValue) {
        enableBodyScroll(observerRefValue);
      }
    };
  }, []);

  return (
    <div
      ref={modalRef}
      onClick={() => navigate(`${previousLocation.pathname}`)}
    >
      <div
        onClick={e => e.stopPropagation()}
      >
        {/* Content */}
      </div>
    </div>
  );
}
``

<h3 className="text-lg font-semibold">Using `useParams`</h3>

[`useParams`](focus://1,10,13) hook was used to get the `boardId` and `cardId` from the url params to fetch the data from the server.


```tsx CardModal.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  FindCardDocument,
  FindCardQuery,
  FindCardQueryVariables,
} from "@/generated/graphql";

export function CardModal({previousLocation}) {
  const { id } = useParams();
  const { data, loading, error } = useQuery<FindCardQuery, FindCardQueryVariables>(FindCardDocument, {
    variables: {
      findCardId: id as string
    },
    onCompleted: (data) => {
      if (data.findCard?.description) {
        setDescription(data.findCard?.description.replace(/<br \/>/g, '\n') as string);
      }
    }
  });
  return (
    // ...
  );
}
```

if card has a description it is set to the state using `setDescription` [replacing `<br />` with `\n`](focus://17) to display the description in a textarea.

<br />
<h2 className="text-2xl font-semibold">Using <span className="underline">[React Hook Form](https://react-hook-form.com/)</span></h2>

Was used to handle the form submission and display the form state.

```tsx CardModal.tsx
import { useForm } from "react-hook-form";

export default function CardModal(){
  const form = useForm()

  return(
    // ...
    <>
      <Button
        variant="destructive"
        className="m-4 flex flex-end gap-2 rounded-lg shadow-sm"
        onClick={form.handleSubmit(handleDeleteCard)}
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? <><Loader2 className="animate-spin" /> Deleting...</> : "Delete Card"}
      </Button>
  </>
  )
}

```

<br />
<h2 className="text-4xl font-semibold">Server</h2>

<h3 className="text-lg font-semibold">Modularizing Schema</h3>

Splitting up the schema types and the associated resolvers into separate files and importing them in the main schema file.


```js schema.js
const { makeExecutableSchema } = require('@graphql-tools/schema')
const merge = require('lodash/merge')
const {
    typeDefs: User,
    resolvers: userResolvers
} = require('./schemas/user')

const {
  typeDefs: Board,
  resolvers: boardResolvers
} = require('./schemas/board')

const Query = `
  type Query {
    test: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
    Query: {
        test: () => 'Hello World'
    },
    Mutation: {}
};

const schema = makeExecutableSchema({
    typeDefs: [Query, User, Board],
    resolvers: merge(resolvers, userResolvers, boardResolvers),
    logger: { log: e => console.log(e) }
});

module.exports = schema
```

```ts user.ts
const typeDefs = `
  // ...

  type User {
    name: String!
    username: String!
    boards: [Board!]!
    id: ID!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    // ...
  }
`

const resolvers = {
  Query: {
    // ...
  },
  Mutation: {
    // ...
  }
}

module.exports = {
  typeDefs,
  resolvers
}
```

```js board.js
const typeDefs = `
  type Attachment {
    id: ID!
    url: String!
    name: String!
    uploaded_at: String!
    open_graph_image: String
  }

  type Image {
    id: ID!
    url: String!
    key: String!
    name: String!
    uploaded_at: String!
  }

  type Card {
    title: String!
    description: String
    id: ID!
    attachments: [Attachment!]
    images: [Image!]
    cover: String
  }

  type List {
    title: String!
    cards: [Card!]!
    id: ID!
  }

  type Board {
    title: String!
    description: String
    created_at: String
    updated_at: String
    saved: Boolean
    saved_at: String
    lists: [List!]!
    bg: String!
    uploaded_bgs: [Image!]
    id: ID!
    user: User!
    listsOrder: [List!]!
  }

  extend type Query {
    // ...
  }

  extend type Mutation {
    // ...
  }
`

const resolvers = {
  Query: {
    // ...
  },
  Mutation: {
    // ...
  }
}

module.exports = {
  typeDefs,
  resolvers
}
```


extending the `Query` and `Mutation` types in each schema file and merging them in the main schema file using `merge` function from `lodash` library.

<br />
<h2 className="text-2xl font-semibold">Creating Context</h2>

logging in would return a token (`jsonwebtoken`) which is used to authenticate the user by decoding the token and finding the user in the database.


```js user.js
login: async (root, args) => {
  const user = await User.findOne({ username: args.username })
  const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(args.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
      throw new GraphQLError('invalid username or password', {
          extensions: {
              code: 'UNAUTHENTICATED'
          }
      })
  }

  const userForToken = {
      username: user.username,
      id: user._id
  }

  return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
}
```

```js context.js
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

const userContext = async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
    }
}

module.exports = userContext
```

<br />
<h2 className="text-2xl font-semibold">Using <span className="underline">[cheerio](https://cheerio.js.org/)</span> to get Open Graph Image</h2>


```js board.js
const { getOpenGraphImage } = require('../utils/opengraph')

const resolvers = {
  Query: {
    // ...
  },
  Mutation: {
    // ...
    addAttachment: async (root, args, { currentUser }) => {
      // ...
      const ogImage = await getOpenGraphImage(attachment.url)
      if(ogImage) {
        attachment.open_graph_image = ogImage
      }
      // ...
    }
  }
}
```

```js opengraph.js
const axios = require('axios');
const cheerio = require('cheerio');

async function getOpenGraphImage(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const ogImage = $('meta[property="og:image"]').attr('content');
    return ogImage;
}

module.exports = {
    getOpenGraphImage,
};
```

<br />
<h2 className="text-2xl font-semibold">Using <span className="underline">[uploadthing](https://docs.uploadthing.com/)</span> to handle file uploads</h2>

Uploadthing simplifies uploading files to S3, while owning and having full control over the service.
requests are made to my `/api/uploadthing` endpoint.


```ts index.ts
import cors from 'cors';
import "dotenv/config"
import express, { Request, Response } from 'express';
import { createUploadthingExpressHandler } from "uploadthing/express"
import { UTApi } from 'uploadthing/server';
import { uploadRouter } from './router'

const app = express();
const utapi = new UTApi()

app.use(cors());
app.get('/', (req, res) => res.send('Hello from uploadthing api'));

app.use(
    '/api/uploadthing',
    createUploadthingExpressHandler({
        router: uploadRouter,
    })
)

const deleteRouter = express.Router()

deleteRouter.post('/:id', async (req:Request, res:Response) => {
    const key = req.params.id
    if (!key) {
        res.status(400).send('missing key')
        return
    }
    try {
        await utapi.deleteFiles(key)
        res.status(200).send('deleted')
    } catch (err) {
        res.status(500).send(err)
    }
})

app.use('/api/uploadthing/delete', deleteRouter)

app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}!`) );
```

```ts router.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

export const uploadRouter = {
  image: f({
    image: {
        maxFileSize: "4MB",
        maxFileCount: 1
    }
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
}),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
```
