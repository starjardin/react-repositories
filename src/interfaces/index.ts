export interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  }
  
  export interface ResultNode {
    description: string;
    name: string;
    forkCount: number;
    stargazerCount: number;
    id: string;
  }
  
  export interface RepositoryResult {
    search: {
      pageInfo: PageInfo;
      nodes: ResultNode[];
    };
  }
  
  export interface QueryVariables {
    before: string | null;
    after: string | null;
    first: number | null;
    last: number | null;
  }
  