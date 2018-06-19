import React, { Component } from "react";
import { AppContext, AppProvier } from "./ContextAPI";

export default class extends Component {
    render() {
        var {name, id} = this.props.employee;
        return <AppContext.Consumer>{
            ({ edit, del }) => (<li id={id}>
                <div id="name">{name}</div>
                <button id="edit" onClick={edit}>Edit</button>
                <button id="del" onClick={del}>Delete</button>
                <style jsx>{`
                    li {
                        display: flex;
                        flex-flow: row wrap;
                        border: 2px solid LightSeaGreen;
                        padding: 0.5rem;
                    }
                    div {
                        margin: 0;
                        cursor: default;
                    }
                    #name {
                        flex: 1;
                    }
                    #edit {
                        color: blue;
                        cursor: pointer;
                        margin-right: 1rem;
                    }
                    #del {
                        color: red;
                        cursor: pointer;
                    }
                    button {
                        border: none;
                        background-color: none;
                        font-size: 1rem;
                        text-decoration: none;
                        font-family: 'Open Sans', Verdana, sans-serif;
                    }
                `}</style>
            </li>)
        }</AppContext.Consumer>
    }
}
