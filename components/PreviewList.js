import React, { Component } from "react";
import { AppContext, AppProvider } from "./ContextAPI";
import Preview from "./Preview";

export default class extends Component {
    render() {
        return <ul>
            <AppContext.Consumer>
                { context => {
                    if(context.employees.length == 0) {
                        return <li>Empty</li>
                    } else {
                        return context.employees.map(employee => (
                            <Preview employee={employee} key={employee.id} />
                        ));
                    }
                } }
            </AppContext.Consumer>
            <style jsx>{`
                ul {
                    list-style-type: none;
                    border: 2px solid LightSeaGreen;
                    padding: 0;
                    margin-left: 2rem;
                    margin-right: 2rem;
                }
                li {
                    padding: 0.2rem;
                    border: 2px solid LightSeaGreen;
                }
            `}</style>
        </ul>
    }
}
