import React, { Component } from "react";
import Link from "next/link";
import { AppContext, AppProvider } from "./ContextAPI";

export default class extends Component {
    render() {
        return <AppContext.Consumer>{
            ({mode, change, create, submit, cancel, viewResults, editing}) => {
                let {fn, ln, salary: s, rate: r, startDate: sd} = editing;

                return <form id="inputForm">
                    <div id="input-title">{mode} Employee</div>
                    <div>
                        <label>First Name: </label>
                        <input onChange={change("fn")} placeholder={fn} />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input onChange={change("ln")} placeholder={ln} />
                    </div>
                    <div>
                        <label>Annual Salary: </label>
                        <input onChange={change("salary")} placeholder={s} />
                    </div>
                    <div>
                        <label>Super Rate: </label>
                        <input onChange={change("rate")} placeholder={r} />
                    </div>
                    <div>
                        <label>Payment Start Date: </label>
                        <select id="monthMenu" name="months">
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <select id="dateMenu" name="dates"></select>
                        <input onChange={change("startDate")} placeholder={sd}/>
                    </div>
                    { (mode == "New") ? (
                        <div>
                            <button onClick={create}>Create</button>
                            <Link href="/results">
                                <button onClick={viewResults}>Results</button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <button onClick={submit}>Submit</button>
                            <button onClick={cancel}>Cancel</button>
                        </div>
                    ) }
                    <style jsx>{`
                        form {
                            padding: 0.5rem;
                            border: 2px solid black;
                        }
                        form > div {
                            margin-bottom: 0.5rem;
                            display: flex;
                            flex-flow: row wrap;
                        }
                        form > div > input {
                            flex: 1;
                            margin-left: 0.5rem;
                            cursor: text;
                        }
                        #input-title {
                            font-size: 1.7rem;
                            cursor: default;
                        }
                        button {
                            border: 1px solid black;
                            background-color: LightSeaGreen;
                            font-size: 1.2rem;
                            color: white;
                            margin-right: 0.5rem;
                            cursor: pointer;
                        }
                        select {
                            margin-left: 1rem;
                            border: 1px solid LightSeaGreen;
                            background-color: white;
                        }
                    `}</style>
                </form>
            }
        }</AppContext.Consumer> // close context
    } // close render
}
