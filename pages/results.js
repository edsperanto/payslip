// import dependencies
import React, { Component } from "react";
import Link from "next/link";
import Components from "../components";
const { Layout, Payslip } = Components;
import helpers from "../helpers";
const { Employee } = helpers;

export default class extends React.Component {
    state = {
        employees: []
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
        return <Layout title="Payslip Results">
            <div id="header">
                <h1>Payslip Results</h1>
            </div>
            <ul>
            {
                this.state.employees.map(employee => {
                    return <Payslip 
                        id={employee.id}
                        employee={employee} 
                    />
                })
            }
            </ul>
            <Link href="/">
                <button onClick={e=>e.preventDefault()}>Back</button>
            </Link>
            <style jsx>{`
                #header {
                    background-color: LightSeaGreen;
                    padding: 0.5rem;
                }
                h1 {
                    font-size: 2.5rem;
                    color: white;
                    margin: 0;
                }
                ul {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                    border: 2px solid black;
                }
                button {
                    border: 1px solid black;
                    background-color: LightSeaGreen;
                    font-size: 1.2rem;
                    color: white;
                    margin: 0.5rem;
                }
            `}</style>
        </Layout>
    }
}
