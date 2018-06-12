import React, { Component } from "react";
import Layout from "./Layout";
import InputForm from "./InputForm";
import Preview from "./Preview";
import Payslip from "./Payslip";
import helpers from "../helpers";
const { Employee } = helpers;

// Use Context API instead of Redux
const AppContext = React.createContext();
class AppProvider extends Component {

    state = {
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
        viewResults: e => {
            e.preventDefault();
        }
    }

    componentDidMount() {
        var storedData = window.sessionStorage.getItem("employees");
        if(!!storedData) {
            var originalData = JSON.parse(storedData);
            console.log(originalData);
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

export default { 
    AppContext,
    AppProvider,
    Layout, 
    InputForm,
    Preview,
    Payslip
};
