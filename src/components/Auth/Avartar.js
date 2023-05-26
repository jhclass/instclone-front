import styled from "styled-components";

const SAvartar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

const Avatar = ({ src, alt, size }) => {
  return <SAvartar src={src} alt={alt} size={size} />;
};

export default Avatar;
