//Pagination needs an improvement - may be just load 10 at a time
import { gql } from "@apollo/client";

//! The fetch needs some improvements
export const REPOSITORIES_QUERY = gql`
  query Repo($after: String, $before: String, $first: Int, $last: Int) {
    search(query: "react sort:stars", type: REPOSITORY, after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        endCursor,
        hasNextPage,
        hasPreviousPage,
        startCursor,
      }
      nodes {
        ... on Repository {
          description
          name
          forkCount
          stargazerCount
          id
        }
      }
    }
  }
`;
