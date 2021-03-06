import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';

const SIGNOUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`;

const SignoutButton = styled.button`
  outline: none;
  margin-left: 2rem;
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 1rem 1.5rem;
  font-weight: 700;
  background-color: ${(props) => props.theme.red};

  transform: translateY(-3px);
  cursor: pointer;
`;

const Signout = (props) => (
  <Mutation mutation={SIGNOUT_MUTATION}>
    {(signout) => (
      <SignoutButton
        className={props.className}
        onClick={() => {
          localStorage.removeItem('token');
          Router.push('/');
          signout();
        }}
      >
        Sing out
      </SignoutButton>
    )}
  </Mutation>
);

export default Signout;
