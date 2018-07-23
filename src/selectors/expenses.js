import moment from 'moment';

const getVisibleExpenses = (expenses, filters) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = filters.startDate ? filters.startDate.isSameOrBefore(createdAtMoment, 'day'): true;
        const endDateMatch = filters.endDate ? filters.startDate.isSameOrAfter(createdAtMoment, 'day'): true;
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

export default getVisibleExpenses;