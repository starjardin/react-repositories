import styled from "styled-components";

export const Loading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Wrapper = styled.div`
  padding: 1rem;
  margin: auto;
`;

export const ButtonContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  &:disabled {
    cursor: not-allowed;
  }
`;
