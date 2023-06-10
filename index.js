require('dotenv').config();
const express = require('express');
const app = express();



// const mongodb_host = process.env.MONGODB_HOST;
// const mongodb_user = process.env.MONGODB_USER;
// const mongodb_password = process.env.MONGODB_PASSWORD;
// const mongodb_database = process.env.MONGODB_DATABASE;
// const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;
// const node_session_secret = process.env.NODE_SESSION_SECRET;
// /* END secret section */

// var {
//     database
// } = include('databaseConnection');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink, concat } from '@apollo/client';

// const client = new ApolloClient({
//     uri: 'https://v4-0-dot-livitay.appspot.com/graphql',
//     cache: new InMemoryCache(),
// });

// const authMiddleware = new ApolloLink((operation, forward) => {
//     operation.setContext(({ headers = {} }) => ({
//         headers: {
//             ...headers,
//             apikey: "3ba6d6af-e690-444c-a902-aebff6c41384"
//         }
//     }));

//     return forward(operation);
// })

// const httpLink = new HttpLink({ uri: 'https://v4-0-dot-livitay.appspot.com/graphql' })


require('./routes/home')(app);









const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

