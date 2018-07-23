import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({description, amount, createdAt, id}) => {
    return (
        <div>
            <Link to={`/edit/${id}`}>
                <h3>{description}</h3>
            </Link>
            <p>{amount/100} - {moment(createdAt).format('MMM Do, YYYY')}</p>            
        </div>
    ); 
}

export default ExpenseListItem;