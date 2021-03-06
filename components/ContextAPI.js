import React, { Component } from "react";
import helpers from "../helpers";
const { Employee } = helpers;

const AppContext = React.createContext();
class AppProvider extends Component {

    state = {
        mode: "New",
        editing: {
            startDate: "01-01",
        },
        employees: [],
        change: prop => {
            if(prop == "sm") { // select month
                return e => {
                    let month = e.target.value;
                    let date = this.state.editing.startDate.substr(2, 3);
                    e.preventDefault();
                    let newStartDate = month + date;
                    this.setState({editing: Object.assign({},
                        this.state.editing, { startDate: newStartDate }
                    )});
                }
            } else if(prop == "sd") { // select date
                return e => {
                    let month = this.state.editing.startDate.substr(0, 3);
                    let date = e.target.value;
                    e.preventDefault();
                    let newStartDate = month + date;
                    this.setState({editing: Object.assign({},
                        this.state.editing, { startDate: newStartDate }
                    )});
                }
            } else {
                return e => {
                    let value = e.target.value;
                    e.preventDefault();
                    this.setState({editing: Object.assign({},
                        this.state.editing, { [prop]: value }
                    )});
                }
            }
        },
        create: async (e) => {
            // prevent default
            e.preventDefault();
            // create new employee
            try {
                var {fn, ln, salary, rate, startDate} = this.state.editing;
                var emp = new Employee(fn, ln, salary, rate, startDate);
                // add to employee list
                var newEmployees = this.state.employees;
                newEmployees.push(emp);
                await this.setState({employees: newEmployees});
                // clear editing and reset form
                await this.setState({editing: {startDate: "01-01"}});
                document.getElementById("inputForm").reset();
                // store in session storage
                await this.storeInSessionStorage();
            } catch(err) {
                this.setState({editing: Object.assign({},
                    this.state.editing, { error: err.message }
                )});
            }
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
            await this.setState({editing: {startDate: "01-01"}});
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
            await this.setState({editing: {startDate: "01-01"}});
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
            await this.state.employees.forEach(async (employee) => {
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
            // pre-select month and date
            var monthMenu = document.getElementById("monthMenu");
            var dateMenu = document.getElementById("dateMenu");
            var startDate = this.state.editing.startDate;
            Array.prototype.forEach.call(monthMenu.children, month => {
                if(month.value == startDate.substr(0, 2)) {
                    month.selected = true;
                } else {
                    month.selected = false;
                }
            });
            Array.prototype.forEach.call(dateMenu.children, date => {
                if(date.value == startDate.substr(3, 2)) {
                    date.selected = true;
                } else {
                    date.selected = false;
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

    validate() {

    }

    storeInSessionStorage() {
        // stare in session storage
        var data = JSON.stringify(this.state.employees);
        window.sessionStorage.setItem("employees", data);
    }

    componentDidMount() {

        // restore state from session storage
        var storedData = window.sessionStorage.getItem("employees");
        if(!!storedData) {
            var originalData = JSON.parse(storedData);
            var arrayOfObjs = originalData.map(employee => {
                let {
                    _firstName: fn,
                    _lastName: ln,
                    _salary: s,
                    _rate: r,
                    _startDate: sd
                } = employee;
                return new Employee(fn, ln, s, r, sd);
            });
            this.setState({employees: arrayOfObjs});
        }

        // generate date menu
        var monthMenu = document.getElementById("monthMenu")
        var dateMenu = document.getElementById("dateMenu");
        var frag = document.createDocumentFragment();
        generateDates(31); // default 31 dates for January
        monthMenu.addEventListener("change", e => {
            var month = parseInt(e.target.value);
            var numDates;
            switch(month) {
                case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                    numDates = 31; break;
                case 4: case 6: case 9: case 11:
                    numDates = 30; break;
                case 2:
                    numDates = 28; break;
            }
            generateDates(numDates);
        });

        function generateDates(numDates) {
            frag.innerHTML = "";
            for(let i = 1; i <= numDates; i++) {
                let op = document.createElement("option");
                op.value = (i < 10) ? ("0" + i) : i;
                op.innerText = i;
                frag.appendChild(op);
            }
            dateMenu.innerHTML = "";
            dateMenu.appendChild(frag);
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
