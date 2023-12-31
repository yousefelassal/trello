import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const SIGNUP = gql`
  mutation signup($name: String!, $username: String!, $password: String!) {
    createUser(name: $name, username: $username, password: $password) {
      name
      username
  }
}
`