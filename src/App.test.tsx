import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { REPOSITORIES_QUERY } from "./query";
import App from "./App";

const NUMBER_RESULT_PER_PAGE = 10;

const mocks = (hasNext: boolean = true, hasPrevious: boolean = true) => [
  {
    request: {
      query: REPOSITORIES_QUERY,
      variables: {
        before: null,
        after: null,
        first: NUMBER_RESULT_PER_PAGE,
        last: null,
      },
    },
    result: {
      data: {
        search: {
          pageInfo: {
            endCursor: "Y3Vyc29yOjIw",
            hasNextPage: hasNext,
            hasPreviousPage: hasPrevious,
            startCursor: "Y3Vyc29yOjEx",
            __typename: "PageInfo",
          },
          nodes: [
            {
              description:
                "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
              forkCount: 38904,
              id: "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
              name: "react",
              stargazerCount: 188755,
              __typename: "Repository",
            },
          ],
          repositoryCount: 2951568,
          __typename: "SearchResultItemConnection",
        },
      },
    },
  },
];

describe("Github app tests", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: () => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      },
    });
  });

  test("renders loading list", () => {
    render(
      <MockedProvider mocks={mocks()}>
        <App />
      </MockedProvider>
    );
    expect(screen.getByText("Loading..."));
  });
});
