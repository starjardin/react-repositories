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

  test("renders projects list", async () => {
    render(
      <MockedProvider mocks={mocks()}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Stars")).toBeInTheDocument();
      expect(screen.getByText("Forks")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  test("renders has next page disabled", async () => {
    render(
      <MockedProvider mocks={mocks(false)}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      const button = screen.getByText("Next");
      expect(button).toHaveAttribute("disabled");
    });
  });

  test("renders has back page disabled", async () => {
    render(
      <MockedProvider mocks={mocks(true, false)}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      const button = screen.getByText("Back");
      expect(button).toHaveAttribute("disabled");
    });
  });
});
