import React, { Component } from "react";
import Layout from "./Layout";
import InputForm from "./InputForm";
import Payslip from "./Payslip";
import helpers from "../helpers";
const { Employee } = helpers;

// Use Context API instead of Redux
const AppContext = React.createContext();
class AppProvider extends Component {

    state = {
        Edward: new Employee("Edward", "Gao", 180000, 0.09, "03-18"),
        pi: 3.1415926,
        setPi: num => {
            this.setState({pi: num});
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
    Payslip
};
