import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Board = {
  __typename?: 'Board';
  bg: Scalars['String']['output'];
  created_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lists: Array<List>;
  listsOrder: Array<List>;
  saved?: Maybe<Scalars['Boolean']['output']>;
  saved_at?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Card = {
  __typename?: 'Card';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type List = {
  __typename?: 'List';
  cards: Array<Card>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  addCard?: Maybe<List>;
  addList?: Maybe<Board>;
  createBoard?: Maybe<Board>;
  createUser?: Maybe<User>;
  deleteBoard?: Maybe<Board>;
  deleteCard?: Maybe<Card>;
  deleteList?: Maybe<List>;
  login?: Maybe<Token>;
  moveCardFromToList?: Maybe<Board>;
  saveBoard?: Maybe<Board>;
  updateBoard?: Maybe<Board>;
  updateCard?: Maybe<Card>;
  updateList?: Maybe<List>;
};


export type MutationAddCardArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  listId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationAddListArgs = {
  boardId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateBoardArgs = {
  bg: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteListArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationMoveCardFromToListArgs = {
  boardId: Scalars['ID']['input'];
  fromCards: Array<Scalars['ID']['input']>;
  fromListId: Scalars['ID']['input'];
  toCards: Array<Scalars['ID']['input']>;
  toListId: Scalars['ID']['input'];
  updated_at: Scalars['String']['input'];
};


export type MutationSaveBoardArgs = {
  id: Scalars['ID']['input'];
  saved: Scalars['Boolean']['input'];
  saved_at?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBoardArgs = {
  bg?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lists?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at: Scalars['String']['input'];
};


export type MutationUpdateCardArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateListArgs = {
  cards?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  allBoards: Array<Board>;
  findBoard?: Maybe<Board>;
  me?: Maybe<User>;
  savedBoards: Array<Board>;
  test?: Maybe<Scalars['String']['output']>;
};


export type QueryFindBoardArgs = {
  id: Scalars['ID']['input'];
};

export type Token = {
  __typename?: 'Token';
  value: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  boards: Array<Board>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type AddCardMutationVariables = Exact<{
  listId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;


export type AddCardMutation = { __typename?: 'Mutation', addCard?: { __typename?: 'List', id: string, title: string, cards: Array<{ __typename?: 'Card', id: string, title: string, description?: string | null }> } | null };

export type AddListMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;


export type AddListMutation = { __typename?: 'Mutation', addList?: { __typename?: 'Board', id: string, title: string, bg: string, description?: string | null, lists: Array<{ __typename?: 'List', id: string, title: string, cards: Array<{ __typename?: 'Card', id: string, title: string, description?: string | null }> }> } | null };

export type AllBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBoardsQuery = { __typename?: 'Query', allBoards: Array<{ __typename?: 'Board', id: string, title: string, description?: string | null, bg: string, updated_at?: string | null, saved?: boolean | null }> };

export type CreateBoardMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  bg: Scalars['String']['input'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Board', id: string, title: string, description?: string | null, bg: string, updated_at?: string | null, saved?: boolean | null } | null };

export type DeleteBoardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard?: { __typename?: 'Board', id: string } | null };

export type DeleteListMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteListMutation = { __typename?: 'Mutation', deleteList?: { __typename?: 'List', id: string } | null };

export type FindBoardQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindBoardQuery = { __typename?: 'Query', findBoard?: { __typename?: 'Board', id: string, bg: string, title: string, description?: string | null, saved?: boolean | null, lists: Array<{ __typename?: 'List', id: string, title: string, cards: Array<{ __typename?: 'Card', id: string, title: string, description?: string | null }> }> } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', value: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, name: string } | null };

export type MoveCardsMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  fromListId: Scalars['ID']['input'];
  toListId: Scalars['ID']['input'];
  fromCards: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  toCards: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  updatedAt: Scalars['String']['input'];
}>;


export type MoveCardsMutation = { __typename?: 'Mutation', moveCardFromToList?: { __typename?: 'Board', id: string, title: string, description?: string | null, updated_at?: string | null, bg: string, lists: Array<{ __typename?: 'List', id: string, title: string, cards: Array<{ __typename?: 'Card', id: string, title: string, description?: string | null }> }> } | null };

export type SaveMutationVariables = Exact<{
  saveBoardId: Scalars['ID']['input'];
  saved: Scalars['Boolean']['input'];
  savedAt?: InputMaybe<Scalars['String']['input']>;
}>;


export type SaveMutation = { __typename?: 'Mutation', saveBoard?: { __typename?: 'Board', id: string, title: string, saved?: boolean | null, saved_at?: string | null, bg: string } | null };

export type GetSavedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSavedQuery = { __typename?: 'Query', savedBoards: Array<{ __typename?: 'Board', id: string, title: string, saved?: boolean | null, saved_at?: string | null, bg: string }> };

export type SignupMutationVariables = Exact<{
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', name: string, username: string } | null };

export type UpdateBoardMutationVariables = Exact<{
  updateBoardId: Scalars['ID']['input'];
  updated_at: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  bg?: InputMaybe<Scalars['String']['input']>;
  lists?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard?: { __typename?: 'Board', id: string, title: string, description?: string | null, updated_at?: string | null, bg: string, lists: Array<{ __typename?: 'List', id: string, title: string, cards: Array<{ __typename?: 'Card', id: string, title: string, description?: string | null }> }> } | null };

export type UpdateListMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  cards?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type UpdateListMutation = { __typename?: 'Mutation', updateList?: { __typename?: 'List', id: string, title: string, cards: Array<{ __typename?: 'Card', id: string, title: string, description?: string | null }> } | null };


export const AddCardDocument = gql`
    mutation addCard($listId: ID!, $title: String!) {
  addCard(listId: $listId, title: $title) {
    id
    title
    cards {
      id
      title
      description
    }
  }
}
    `;
export type AddCardMutationFn = Apollo.MutationFunction<AddCardMutation, AddCardMutationVariables>;

/**
 * __useAddCardMutation__
 *
 * To run a mutation, you first call `useAddCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCardMutation, { data, loading, error }] = useAddCardMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddCardMutation(baseOptions?: Apollo.MutationHookOptions<AddCardMutation, AddCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCardMutation, AddCardMutationVariables>(AddCardDocument, options);
      }
export type AddCardMutationHookResult = ReturnType<typeof useAddCardMutation>;
export type AddCardMutationResult = Apollo.MutationResult<AddCardMutation>;
export type AddCardMutationOptions = Apollo.BaseMutationOptions<AddCardMutation, AddCardMutationVariables>;
export const AddListDocument = gql`
    mutation addList($boardId: ID!, $title: String!) {
  addList(boardId: $boardId, title: $title) {
    id
    title
    bg
    description
    lists {
      id
      title
      cards {
        id
        title
        description
      }
    }
  }
}
    `;
export type AddListMutationFn = Apollo.MutationFunction<AddListMutation, AddListMutationVariables>;

/**
 * __useAddListMutation__
 *
 * To run a mutation, you first call `useAddListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addListMutation, { data, loading, error }] = useAddListMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddListMutation(baseOptions?: Apollo.MutationHookOptions<AddListMutation, AddListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddListMutation, AddListMutationVariables>(AddListDocument, options);
      }
export type AddListMutationHookResult = ReturnType<typeof useAddListMutation>;
export type AddListMutationResult = Apollo.MutationResult<AddListMutation>;
export type AddListMutationOptions = Apollo.BaseMutationOptions<AddListMutation, AddListMutationVariables>;
export const AllBoardsDocument = gql`
    query allBoards {
  allBoards {
    id
    title
    description
    bg
    updated_at
    saved
  }
}
    `;

/**
 * __useAllBoardsQuery__
 *
 * To run a query within a React component, call `useAllBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBoardsQuery(baseOptions?: Apollo.QueryHookOptions<AllBoardsQuery, AllBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBoardsQuery, AllBoardsQueryVariables>(AllBoardsDocument, options);
      }
export function useAllBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBoardsQuery, AllBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBoardsQuery, AllBoardsQueryVariables>(AllBoardsDocument, options);
        }
export function useAllBoardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllBoardsQuery, AllBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllBoardsQuery, AllBoardsQueryVariables>(AllBoardsDocument, options);
        }
export type AllBoardsQueryHookResult = ReturnType<typeof useAllBoardsQuery>;
export type AllBoardsLazyQueryHookResult = ReturnType<typeof useAllBoardsLazyQuery>;
export type AllBoardsSuspenseQueryHookResult = ReturnType<typeof useAllBoardsSuspenseQuery>;
export type AllBoardsQueryResult = Apollo.QueryResult<AllBoardsQuery, AllBoardsQueryVariables>;
export const CreateBoardDocument = gql`
    mutation createBoard($title: String!, $description: String, $bg: String!) {
  createBoard(title: $title, description: $description, bg: $bg) {
    id
    title
    description
    bg
    updated_at
    saved
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      bg: // value for 'bg'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const DeleteBoardDocument = gql`
    mutation deleteBoard($id: ID!) {
  deleteBoard(id: $id) {
    id
  }
}
    `;
export type DeleteBoardMutationFn = Apollo.MutationFunction<DeleteBoardMutation, DeleteBoardMutationVariables>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBoardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, options);
      }
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const DeleteListDocument = gql`
    mutation deleteList($id: ID!) {
  deleteList(id: $id) {
    id
  }
}
    `;
export type DeleteListMutationFn = Apollo.MutationFunction<DeleteListMutation, DeleteListMutationVariables>;

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, options);
      }
export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>;
export type DeleteListMutationResult = Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<DeleteListMutation, DeleteListMutationVariables>;
export const FindBoardDocument = gql`
    query findBoard($id: ID!) {
  findBoard(id: $id) {
    id
    bg
    title
    description
    saved
    lists {
      id
      title
      cards {
        id
        title
        description
      }
    }
  }
}
    `;

/**
 * __useFindBoardQuery__
 *
 * To run a query within a React component, call `useFindBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindBoardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindBoardQuery(baseOptions: Apollo.QueryHookOptions<FindBoardQuery, FindBoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindBoardQuery, FindBoardQueryVariables>(FindBoardDocument, options);
      }
export function useFindBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindBoardQuery, FindBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindBoardQuery, FindBoardQueryVariables>(FindBoardDocument, options);
        }
export function useFindBoardSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindBoardQuery, FindBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindBoardQuery, FindBoardQueryVariables>(FindBoardDocument, options);
        }
export type FindBoardQueryHookResult = ReturnType<typeof useFindBoardQuery>;
export type FindBoardLazyQueryHookResult = ReturnType<typeof useFindBoardLazyQuery>;
export type FindBoardSuspenseQueryHookResult = ReturnType<typeof useFindBoardSuspenseQuery>;
export type FindBoardQueryResult = Apollo.QueryResult<FindBoardQuery, FindBoardQueryVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    username
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MoveCardsDocument = gql`
    mutation moveCards($boardId: ID!, $fromListId: ID!, $toListId: ID!, $fromCards: [ID!]!, $toCards: [ID!]!, $updatedAt: String!) {
  moveCardFromToList(
    boardId: $boardId
    fromListId: $fromListId
    toListId: $toListId
    fromCards: $fromCards
    toCards: $toCards
    updated_at: $updatedAt
  ) {
    id
    title
    description
    updated_at
    bg
    lists {
      id
      title
      cards {
        id
        title
        description
      }
    }
  }
}
    `;
export type MoveCardsMutationFn = Apollo.MutationFunction<MoveCardsMutation, MoveCardsMutationVariables>;

/**
 * __useMoveCardsMutation__
 *
 * To run a mutation, you first call `useMoveCardsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveCardsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveCardsMutation, { data, loading, error }] = useMoveCardsMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      fromListId: // value for 'fromListId'
 *      toListId: // value for 'toListId'
 *      fromCards: // value for 'fromCards'
 *      toCards: // value for 'toCards'
 *      updatedAt: // value for 'updatedAt'
 *   },
 * });
 */
export function useMoveCardsMutation(baseOptions?: Apollo.MutationHookOptions<MoveCardsMutation, MoveCardsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveCardsMutation, MoveCardsMutationVariables>(MoveCardsDocument, options);
      }
export type MoveCardsMutationHookResult = ReturnType<typeof useMoveCardsMutation>;
export type MoveCardsMutationResult = Apollo.MutationResult<MoveCardsMutation>;
export type MoveCardsMutationOptions = Apollo.BaseMutationOptions<MoveCardsMutation, MoveCardsMutationVariables>;
export const SaveDocument = gql`
    mutation save($saveBoardId: ID!, $saved: Boolean!, $savedAt: String) {
  saveBoard(id: $saveBoardId, saved: $saved, saved_at: $savedAt) {
    id
    title
    saved
    saved_at
    bg
  }
}
    `;
export type SaveMutationFn = Apollo.MutationFunction<SaveMutation, SaveMutationVariables>;

/**
 * __useSaveMutation__
 *
 * To run a mutation, you first call `useSaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMutation, { data, loading, error }] = useSaveMutation({
 *   variables: {
 *      saveBoardId: // value for 'saveBoardId'
 *      saved: // value for 'saved'
 *      savedAt: // value for 'savedAt'
 *   },
 * });
 */
export function useSaveMutation(baseOptions?: Apollo.MutationHookOptions<SaveMutation, SaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveMutation, SaveMutationVariables>(SaveDocument, options);
      }
export type SaveMutationHookResult = ReturnType<typeof useSaveMutation>;
export type SaveMutationResult = Apollo.MutationResult<SaveMutation>;
export type SaveMutationOptions = Apollo.BaseMutationOptions<SaveMutation, SaveMutationVariables>;
export const GetSavedDocument = gql`
    query getSaved {
  savedBoards {
    id
    title
    saved
    saved_at
    bg
  }
}
    `;

/**
 * __useGetSavedQuery__
 *
 * To run a query within a React component, call `useGetSavedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSavedQuery(baseOptions?: Apollo.QueryHookOptions<GetSavedQuery, GetSavedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSavedQuery, GetSavedQueryVariables>(GetSavedDocument, options);
      }
export function useGetSavedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSavedQuery, GetSavedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSavedQuery, GetSavedQueryVariables>(GetSavedDocument, options);
        }
export function useGetSavedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSavedQuery, GetSavedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSavedQuery, GetSavedQueryVariables>(GetSavedDocument, options);
        }
export type GetSavedQueryHookResult = ReturnType<typeof useGetSavedQuery>;
export type GetSavedLazyQueryHookResult = ReturnType<typeof useGetSavedLazyQuery>;
export type GetSavedSuspenseQueryHookResult = ReturnType<typeof useGetSavedSuspenseQuery>;
export type GetSavedQueryResult = Apollo.QueryResult<GetSavedQuery, GetSavedQueryVariables>;
export const SignupDocument = gql`
    mutation signup($name: String!, $username: String!, $password: String!) {
  createUser(name: $name, username: $username, password: $password) {
    name
    username
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateBoardDocument = gql`
    mutation updateBoard($updateBoardId: ID!, $updated_at: String!, $title: String, $description: String, $bg: String, $lists: [ID!]) {
  updateBoard(
    id: $updateBoardId
    updated_at: $updated_at
    title: $title
    description: $description
    bg: $bg
    lists: $lists
  ) {
    id
    title
    description
    updated_at
    bg
    lists {
      id
      title
      cards {
        id
        title
        description
      }
    }
  }
}
    `;
export type UpdateBoardMutationFn = Apollo.MutationFunction<UpdateBoardMutation, UpdateBoardMutationVariables>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      updateBoardId: // value for 'updateBoardId'
 *      updated_at: // value for 'updated_at'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      bg: // value for 'bg'
 *      lists: // value for 'lists'
 *   },
 * });
 */
export function useUpdateBoardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMutation, UpdateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, options);
      }
export type UpdateBoardMutationHookResult = ReturnType<typeof useUpdateBoardMutation>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const UpdateListDocument = gql`
    mutation updateList($id: ID!, $title: String, $cards: [ID!]) {
  updateList(id: $id, title: $title, cards: $cards) {
    id
    title
    cards {
      id
      title
      description
    }
  }
}
    `;
export type UpdateListMutationFn = Apollo.MutationFunction<UpdateListMutation, UpdateListMutationVariables>;

/**
 * __useUpdateListMutation__
 *
 * To run a mutation, you first call `useUpdateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListMutation, { data, loading, error }] = useUpdateListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      cards: // value for 'cards'
 *   },
 * });
 */
export function useUpdateListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListMutation, UpdateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListMutation, UpdateListMutationVariables>(UpdateListDocument, options);
      }
export type UpdateListMutationHookResult = ReturnType<typeof useUpdateListMutation>;
export type UpdateListMutationResult = Apollo.MutationResult<UpdateListMutation>;
export type UpdateListMutationOptions = Apollo.BaseMutationOptions<UpdateListMutation, UpdateListMutationVariables>;