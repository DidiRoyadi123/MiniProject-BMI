import {ApolloClient, HttpLink, InMemoryCache, split} from 'apollo-boost'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const httpLink = new HttpLink({
    uri: 'https://evolved-feline-62.hasura.app/v1/graphql'
});

const wsLink = new WebSocketLink({ 
    uri: 'wss://evolved-feline-62.hasura.app/v1/graphql', 
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind == 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
})

const apolloProvider = new VueApollo( {
    defaultClient: apolloClient,
});

Vue.use(VueApollo);

new Vue({
    store,
    router,
    apolloProvider,
    render: h => h(App)
}).$mount('#app')