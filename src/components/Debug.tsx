import styled from "@emotion/styled";

const Pre = styled.pre`
  font-size: 0.8rem;
`;

const Debug = ({ data, ...props }: { data: any }) => {
  return <Pre {...props}>{JSON.stringify(data, null, 2)}</Pre>;
};

export default Debug;
