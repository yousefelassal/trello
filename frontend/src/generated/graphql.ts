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
  saved?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Card = {
  __typename?: 'Card';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type List = {
  __typename?: 'List';
  cards: Array<Card>;
  id: Scalars['ID']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  addCard?: Maybe<Board>;
  addList?: Maybe<Board>;
  createBoard?: Maybe<Board>;
  createUser?: Maybe<User>;
  deleteBoard?: Maybe<Board>;
  deleteCard?: Maybe<Board>;
  deleteList?: Maybe<Board>;
  login?: Maybe<Token>;
  saveBoard?: Maybe<Board>;
  updateBoard?: Maybe<Board>;
  updateCard?: Maybe<Board>;
  updateList?: Maybe<Board>;
};


export type MutationAddCardArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  listId: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationAddListArgs = {
  boardId: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateBoardArgs = {
  bg?: InputMaybe<Scalars['String']['input']>;
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


export type MutationSaveBoardArgs = {
  id: Scalars['ID']['input'];
  saved: Scalars['Boolean']['input'];
};


export type MutationUpdateBoardArgs = {
  bg?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateCardArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateListArgs = {
  id: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allBoards: Array<Board>;
  findBoard?: Maybe<Board>;
  me?: Maybe<User>;
  saveBoard?: Maybe<Board>;
  test?: Maybe<Scalars['String']['output']>;
};


export type QueryFindBoardArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySaveBoardArgs = {
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

export type AllBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBoardsQuery = { __typename?: 'Query', allBoards: Array<{ __typename?: 'Board', id: string, title: string, description?: string | null, bg: string, updated_at?: string | null }> };

export type CreateBoardMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  bg: Scalars['String']['input'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'Board', id: string, title: string, description?: string | null, bg: string, updated_at?: string | null } | null };

export type FindBoardQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindBoardQuery = { __typename?: 'Query', findBoard?: { __typename?: 'Board', id: string, bg: string, title: string, description?: string | null, lists: Array<{ __typename?: 'List', id: string, title: string, position: number, cards: Array<{ __typename?: 'Card', id: string, title: string, description?: string | null, position: number }> }> } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', value: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, name: string } | null };

export type SignupMutationVariables = Exact<{
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', name: string, username: string } | null };


export const AllBoardsDocument = gql`
    query allBoards {
  allBoards {
    id
    title
    description
    bg
    updated_at
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
export const FindBoardDocument = gql`
    query findBoard($id: ID!) {
  findBoard(id: $id) {
    id
    bg
    title
    description
    lists {
      id
      title
      position
      cards {
        id
        title
        description
        position
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