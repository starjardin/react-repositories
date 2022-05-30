import TableView, { DataType } from "./Table";
import { useQuery } from "@apollo/client";
import { REPOSITORIES_QUERY } from "./query";
import React, { useCallback } from "react";
import { QueryVariables, RepositoryResult } from "./interfaces";
import { Button, ButtonContainer, Loading, Wrapper } from "./styles";

const NUMBER_RESULT_PER_PAGE = 10;

function App() {
  const { data, loading, error, refetch } = useQuery<
    RepositoryResult,
    QueryVariables
  >(REPOSITORIES_QUERY, {
    variables: {
      before: null,
      after: null,
      first: NUMBER_RESULT_PER_PAGE,
      last: null,
    },
  });

  const backDisabled = !data?.search.pageInfo.hasPreviousPage;
  const nextDisabled = !data?.search.pageInfo.hasNextPage;

  const handleNextPage = useCallback(() => {
    const endCursor = data?.search.pageInfo.endCursor;
    refetch({ after: endCursor });
  }, [data?.search.pageInfo]);

  const handlePreviousPage = useCallback(() => {
    const startCursor = data?.search.pageInfo.startCursor;
    refetch({ before: startCursor, last: NUMBER_RESULT_PER_PAGE, first: null });
  }, [data?.search.pageInfo]);

  return (
    <Wrapper>
      {loading && <Loading>Loading...</Loading>}
      {data && (
        <React.Fragment>
          <TableView data={data?.search.nodes as DataType[]} />
          <ButtonContainer>
            <Button onClick={handlePreviousPage} disabled={backDisabled}>
              Back
            </Button>
            <Button onClick={handleNextPage} disabled={nextDisabled}>
              Next
            </Button>
          </ButtonContainer>
        </React.Fragment>
      )}
      {error && <div>There was an error while fetching data</div>}
    </Wrapper>
  );
}

export default App;
