import React, { Component } from "react";
import helpers from "../helpers";
const { Employee } = helpers;

const AppContext = React.createContext();
class AppProvider extends Component {

    state = {
        mode: "New",
        editing: {},
        employees: [],
        change: prop => {
            return e => {
                let value = e.target.value;
                e.preventDefault();
                this.setState({editing: Object.assign({},
                    this.state.editing, { [prop]: value }
                )});
            }
        },
        submit: e => {
            // prevent default
            e.preventDefault();
            // create new employee
            let editing = this.state.editing;
            let {fn, ln, salary, rate, startDate} = editing;
            let emp = new Employee(fn, ln, salary, rate, startDate);
            // add to employee list
            let newEmployees = this.state.employees;
            newEmployees.push(emp);
            this.setState({employees: newEmployees});
            // stare in session storage
            var data = JSON.stringify(this.state.employees);
            window.sessionStorage.setItem("employees", data);
        },
        toggleEdit: e => {
            // prevent default
            e.preventDefault();
            // change mode
            this.setState({mode: "Edit"});
            console.log("ID");
            console.log(e.parentElement.id);
            console.log(e);
        },
        viewResults: e => {
            e.preventDefault();
        }
    }

    componentDidMount() {
        var storedData = window.sessionStorage.getItem("employees");
        if(!!storedData) {
            var originalData = JSON.parse(storedData);
            var arrayOfObjs = originalData.map(employee => {
                let {_firstName, _lastName, _salary, _rate, _startDate} = employee;
                return new Employee(_firstName, _lastName, _salary, _rate, _startDate);
            });
            this.setState({employees: arrayOfObjs});
        }
    }

    render() {
        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    }

}

export {
    AppContext,
    AppProvider
}
