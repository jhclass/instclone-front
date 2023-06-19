import styled from "styled-components";

const SAvartar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Avatar = ({ src, alt, size }) => {
  return <SAvartar bg={src} alt={alt} size={size} />;
};

export default Avatar;
