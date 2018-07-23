import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

class ExpenseListFilters extends React.Component {
    state = {
        calenderFocused: null
    }

    onDateChange = ({ startDate, endDate }) => {
        console.log(this);
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    render(){
        return (
            <div>
                <input type="text" 
                    id="textFilter" 
                    onChange={(e) => {this.props.dispatch(setTextFilter(e.target.value))}} 
                    value={this.props.filters.text}
                />
                <select
                    value={this.props.filters.sortBy} 
                    onChange={(e) => {                
                    switch (e.target.value)
                    {
                        case 'date':
                            props.dispatch(sortByDate());
                            break;
                        case 'amount':
                            props.dispatch(sortByAmount());
                            break;
                        default:
                            props.dispatch(sortByDate());
                            break;
                    }
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                    startDateId="expenses_start_date" // PropTypes.string.isRequired,
                    endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                    endDateId="expenses_end_date" // PropTypes.string.isRequired,
                    onDatesChange={this.onDateChange} // PropTypes.func.isRequired,
                    focusedInput={this.state.calenderFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={calenderFocused => this.setState({ calenderFocused })} // PropTypes.func.isRequired,
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates = {true}
                />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        filters:state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters)