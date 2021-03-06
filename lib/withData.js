import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

import { endpoint, productionEndpoint } from '../config';
import { LOCAL_STATE_QUERY } from './queries';

let apolloClient = null;
// function createClient({ headers }) {
// headers.append();
// const token = localStorage.getItem('token');
// console.log(token, 'createCliet');

const getToken = () => {
  let token = 'null';
  try {
    if (localStorage) {
      token = localStorage.getItem('token');
      return token ? token : '';
    } else {
      return '';
    }
  } catch (err) {
    token = 'null';
    console.log(err);
    return token;
  }
};

apolloClient = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? endpoint : productionEndpoint,
  request: (operation) => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      },
      headers: {
        // ...headers,
        'Access-Control-Allow-Origin': 'https://pep-eu.herokuapp.com',
        token: getToken(),
      },
    });
  },
  clientState: {
    resolvers: {
      Mutation: {
        saveSearchData(_, { projectType, activity, nationality, destination }, { cache }) {
          const previousData = cache.readQuery({ query: LOCAL_STATE_QUERY });
          const data = {
            ...previousData,
            searchData: { __typename: 'search', projectType, activity, nationality, destination },
          };

          cache.writeData({ data });
        },
        setPopup(_, { isPopupOpen, title, messages, button }, { cache }) {
          const previousData = cache.readQuery({ query: LOCAL_STATE_QUERY });
          const data = {
            ...previousData,
            popup: { __typename: 'popup', isPopupOpen, title, messages, button },
          };

          cache.writeData({ data });
        },
      },
    },
    defaults: {
      searchData: {
        __typename: 'search',
        projectType: 'all',
        activity: 'all',
        nationality: 'all',
        destination: 'all',
      },
      popup: {
        __typename: 'popup',
        isPopupOpen: false,
        title: '',
        messages: [],
        button: '',
      },
    },
  },
});
// return apolloClient;
// }

function createClient({ headers }) {
  return apolloClient;
}

export { apolloClient };

export default withApollo(createClient);
