// import dependencies
import React, { Component } from "react";
import Link from "next/link";
import Components from "../components";
const { AppContext, AppProvider } = Components;
const { Layout, InputForm, Payslip } = Components;

// main app component
export default class extends Component {
    render() {
        return <AppProvider>
            <Layout title="Payslip">

                <AppContext.Consumer>
                    {context => <Payslip employee={context.Edward}></Payslip>}
                </AppContext.Consumer>
                <br />

                /* testing */
                <br />
                <Link href="/test"><a>here</a></Link>
                <h2>
                    <AppContext.Consumer>
                        {context => context.pi}
                    </AppContext.Consumer>
                </h2>
                <AppContext.Consumer>
                    {context => <form>
                        <input
                        onChange={ e => {
                            e.preventDefault();
                            context.setPi(4);
                        } }
                        />
                        <button onClick={context.setPi}>SET</button>
                    </form>
                    }
                </AppContext.Consumer>
                /* testing */

                <style jsx>{`
                    h1 {
                        font-size: 2rem;
                    }
                `}</style>

            </Layout>
        </AppProvider>
    }
}
