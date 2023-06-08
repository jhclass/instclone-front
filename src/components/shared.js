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

export const SmallText = styled.span`
  opacity: 0.7;
  font-size: 12px;
`;

export const FeedPadding = styled.div`
  padding: 5px 0;
`;
