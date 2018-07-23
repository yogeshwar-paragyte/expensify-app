import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux'
import {addExpense} from './actions/expenses';
import './styles/styles.scss';
import 'normalize.css/normalize.css';


const store = configureStore();

// add items to the store
store.dispatch(addExpense({description:'Water Bill', note:'', amount:1000, createdAt:958694}));
store.dispatch(addExpense({description:'Gas Bill', note:'', amount:2000, createdAt:958600}));
store.dispatch(addExpense({description:'Food', note:'', amount:500, createdAt:958999}));

//Industratry extenstion officer
const jsx = 
    (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )

ReactDOM.render(jsx, document.getElementById('app')) ;


