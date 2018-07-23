import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
    return (
        <div>
            <h1>Info</h1>
            <p>The info is: {props.info}</p>
        </div>
    )
};

//This is a function that Takes component as an input and returns another heigher order component.
//This is different than having chield component. 
const adminInfo = (WrappedComponent) => {
    return (props) => {
        return (
            <div>
                {props.isAdmin && <p>This is private info. Please don't share!</p>}
                <WrappedComponent {...props}/>
            </div>
        )
    }
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => {
        return (
            <div>
            {
                props.isAuthanticated? <WrappedComponent {...props}/>:
                <p>You are not authorized to view this info!</p>
            }
            </div>
        )
    }
}
const AdminInfo = adminInfo(Info);

const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info='some info.'/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthanticated={false} info='These are the details'/>, document.getElementById('app'));