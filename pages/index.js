// import dependencies
import React, { Component } from "react";
import Components from "../components";
const { Layout, InputForm, Payslip } = Components;
import helpers from "../helpers";
const { Employee } = helpers;

// use Context API instead of Redux
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

// main app component
export default class extends React.Component {
    render() {
        return <AppProvider>
            <Layout title="Payslip">

                <AppContext.Consumer>
                    {context => <Payslip employee={context.Edward}></Payslip>}
                </AppContext.Consumer>
                <br />

                /* testing */
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
