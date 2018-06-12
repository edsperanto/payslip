// import dependencies
import React, { Component } from "react";
import Components from "../components";
const { AppProvider, AppContext } = Components;
const { Layout, Payslip } = Components;

export default class extends React.Component {
    render() {
        return <AppProvider><Layout title="Results">
            <AppContext.Consumer>
                {context => <Payslip employee={context.Edward}></Payslip>}
            </AppContext.Consumer>
        </Layout></AppProvider>
    }
}
