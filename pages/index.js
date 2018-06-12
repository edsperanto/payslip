// import dependencies
import React, { Component } from "react";
import Link from "next/link";
import Components from "../components";
const { AppContext, AppProvider } = Components;
const { Layout, InputForm, Preview, Payslip } = Components;

// main app component
export default class extends Component {
    render() {
        return <AppProvider>
            <Layout title="Create Payslips">

                <div id="header">
                    <h1>Create Payslips</h1>
                </div>
                <div id="content">
                    <AppContext.Consumer>
                        {context => <InputForm 
                            change={context.change}
                            submit={context.submit}>
                        </InputForm>}
                    </AppContext.Consumer>
                    <div id="preview">
                        <div id="preview-title">Preview List</div>
                        <ul><AppContext.Consumer>
                            {context => context.employees.map(employee => {
                                return <Preview employee={employee}></Preview>
                            })}
                        </AppContext.Consumer></ul>
                    </div>
                </div>

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
                    #content {
                        border: 2px solid black;
                    }
                    #preview {
                        padding: 0.5rem;
                        border: 2px solid black;
                    }
                    #preview-title {
                        font-size: 1.5rem;
                    }
                `}</style>

            </Layout>
        </AppProvider>
    }
}
