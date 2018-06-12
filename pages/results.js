// import dependencies
import React, { Component } from "react";
import Link from "next/link";
import Components from "../components";
const { AppProvider, AppContext } = Components;
const { Layout, Payslip } = Components;

export default class extends React.Component {
    render() {
        return <AppProvider><Layout title="Payslip Results">
            <h3>Payslip Results</h3>
            <ul><AppContext.Consumer>
                {context => context.employees.map(employee => {
                    return <Payslip employee={employee}></Payslip>
                })}
            </AppContext.Consumer></ul>
            <Link href="/">
                <button onClick={e=>e.preventDefault()}>Back</button>
            </Link>
        </Layout></AppProvider>
    }
}
