import styled from "styled-components";
export const BaseBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
`;

export const FatText = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;
