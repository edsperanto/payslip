// import dependencies
import React, { Component } from "react";
import Link from "next/link";
import Components from "../components";
const { AppContext, AppProvider } = Components;
const { Layout, InputForm, PreviewList, Payslip } = Components;

// main app component
export default class extends Component {
    render() {
        return <AppProvider><Layout title="Create Payslips">

            <div id="header"><h1>Payslips</h1></div>
            <div id="content">
                <InputForm />
                <div id="preview">
                    <div id="preview-title">Preview List</div>
                    <PreviewList />
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
                    cursor: default;
                    font-weight: 300;
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
                    cursor: default;
                }
            `}</style>

        </Layout></AppProvider>
    }
}
