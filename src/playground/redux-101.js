import {createStore} from 'redux';

const store = createStore((state = {count:0}, action) => {    
    switch (action.type)
    {
        case 'INCREMENT':
            const incrementBy = action.incrementBy?action.incrementBy:1;
            return {
                count: state.count + incrementBy
            }
        case 'DECREMENT':
            const decrementBy = action.decrementBy?action.decrementBy:1;
            return {
                count: state.count - decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return{
                count: action.count
            }
        default:
            return state;
    }
})

const unsubcribe = store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch({
    type:'INCREMENT',
    incrementBy: 5
})

store.dispatch({
    type:'INCREMENT'
})


store.dispatch({
    type:'RESET'
});

store.dispatch({
    type:'DECREMENT',
    decrementBy:5
});

store.dispatch({
    type:'SET',
    count: 55
})