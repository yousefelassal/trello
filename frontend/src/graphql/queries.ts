import { graphql } from '.'

export const ME = graphql(/* GraphQL */`
  query me {
    me {
      username
      name
      boards {
        id
        title
        bg
      }
    }
  }
`)