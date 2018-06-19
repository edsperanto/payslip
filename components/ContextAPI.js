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
        create: async (e) => {
            // prevent default
            e.preventDefault();
            // create new employee
            let {fn, ln, salary, rate, startDate} = this.state.editing;
            let emp = new Employee(fn, ln, salary, rate, startDate);
            // add to employee list
            let newEmployees = this.state.employees;
            newEmployees.push(emp);
            await this.setState({employees: newEmployees});
            // clear editing and reset form
            await this.setState({editing: {}});
            document.getElementById("inputForm").reset();
            // store in session storage
            await this.storeInSessionStorage();
        },
        submit: async (e) => {
            // prevent default
            e.preventDefault();
            // edit employee
            let {id, fn, ln, salary, rate, startDate} = this.state.editing;
            this.state.employees.map(async (employee) => {
                if(employee.id == id) {
                    employee.firstName = fn;
                    employee.lastName = ln;
                    employee.salary = salary;
                    employee.rate = rate;
                    employee.startDate = startDate;
                }
                return employee;
            });
            // clear editing and revert to new employee mode
            await this.setState({editing: {}});
            await this.setState({mode: "New"});
            // reset form
            document.getElementById("inputForm").reset();
            // store in session storage
            this.storeInSessionStorage();
        },
        cancel: async (e) => {
            // prevent default
            e.preventDefault();
            // clear editing and revert to new employee mode
            await this.setState({editing: {}});
            await this.setState({mode: "New"});
            // reset form
            document.getElementById("inputForm").reset();
        },
        edit: async (e) => {
            // prevent default
            e.preventDefault();
            // change mode
            this.setState({mode: "Edit"});
            // populate form
            let id = e.target.parentElement.id;
            this.state.employees.forEach(async (employee) => {
                if(employee.id == id) {
                    let {
                        _firstName: fn, 
                        _lastName: ln, 
                        _salary: salary,
                        _rate: rate,
                        _startDate: startDate
                    } = employee;
                    startDate = startDate.format("MM-DD");
                    let editEmployee = {id, fn, ln, salary, rate, startDate};
                    await this.setState({editing: Object.assign({},
                        this.state.editing, editEmployee
                    )});
                }
            });
        },
        del: async (e) => {
            // prevent default
            e.preventDefault();
            // delete from employees array
            let id = e.target.parentElement.id;
            let newArr = this.state.employees.filter(employee => {
                return employee.id !== id;
            });
            await this.setState({employees: newArr});
            // store in session storage
            await this.storeInSessionStorage();
        },
        viewResults: e => {
            e.preventDefault();
        }
    }

    storeInSessionStorage() {
        // stare in session storage
        var data = JSON.stringify(this.state.employees);
        window.sessionStorage.setItem("employees", data);
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
