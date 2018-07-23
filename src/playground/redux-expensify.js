import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {} //object destructuring
) => {
    return {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    };    
}


//REMOVE_EXPENSE
const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
})

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
        type: 'EDIT_EXPENSE',
        id,
        updates
    })

//SET_TEXT_FILTER
const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
})

//SORT_BY_DATE
const sortByDate = () =>({type: 'SORT_BY_DATE'})

//SORT_BY_AMOUNT
const sortByAmount = () =>({type: 'SORT_BY_AMOUNT'})

//SET_START_DATE
const setStartDate = (startDate) =>({type: 'SET_START_DATE', startDate})

//SET_END_DATE
const setEndDate = (endDate) =>({type: 'SET_END_DATE', endDate})

const defaultExpensesState = []

const expensesReducer = (state = defaultExpensesState, action) =>{
    switch (action.type)
    {  
        case 'ADD_EXPENSE':
            return [...state, action.expense];  
        case 'REMOVE_EXPENSE':
            return state.filter((element) => (element.id != action.id));   
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id)
                {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else{
                    return expense;
                }
            });
        default:
            return state;
    }
}


const defaultFiltersState = {
    text:'', 
    sortBy:'date', 
    startDate:undefined, 
    endDate:undefined
}
const filtersReducer = (state = defaultFiltersState, action) =>{
    switch (action.type)
    {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text:action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy:'date'
            }
        case 'SORT_BY_AMOUNT':
        return {
            ...state,
            sortBy:'amount'
        }
        case 'SET_START_DATE':
        return {
            ...state,
            startDate: action.startDate
        }
        case 'SET_END_DATE':
        return {
            ...state,
            endDate: action.endDate
        }
        default:
            return state;
    }
}


const getVisibleExpenses = (expenses, filters) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate || startDate <= expense.createdAt;
        const endDateMatch = typeof endDate || endDate >= expense.createdAt;
        const textMatch = expense.description.toLowerCase().includes(filters.text.toLowerCase())|| expense.note.toLowerCase().includes(filters.text.toLowerCase());
        return (startDateMatch &&
                endDateMatch &&
                textMatch)
    }).sort((a, b) => {
        if (filters.sortBy === 'date')
        {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if (filters.sortBy === 'amount')
        {
            return a.amount < b.amount ? 1:-1;
        }
    })
}

const store = createStore(
    combineReducers(
    {
        expenses: expensesReducer,
        filters: filtersReducer
    }
));

store.subscribe(() =>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({description:'School Fee', amount:20000, createdAt:-10000}));
const expenseTwo = store.dispatch(addExpense({description:'Chai', amount:1000, createdAt:110000}));

// store.dispatch(removeExpense(expenseOne.expense.id));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount:300}));

store.dispatch(sortByAmount());
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate('2/2/2018'));
// store.dispatch(setEndDate('2/2/2018'));