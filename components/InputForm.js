// import dependencies
import Link from "next/link";

const InputForm = ({ change, submit, viewResults }) => (<form>
    <div id="input-title">New Employee</div>
    <div>
        <label>First Name: </label>
        <input onChange={change("fn")}></input>
    </div>
    <div>
        <label>Last Name: </label>
        <input onChange={change("ln")}></input>
    </div>
    <div>
        <label>Annual Salary: </label>
        <input onChange={change("salary")}></input>
    </div>
    <div>
        <label>Super Rate: </label>
        <input onChange={change("rate")}></input>
    </div>
    <div>
        <label>Payment Start Date: </label>
        <input onChange={change("startDate")}></input>
    </div>
    <div>
        <button onClick={submit}>Create</button>
        <Link href="/results">
            <button onClick={viewResults}>Results</button>
        </Link>
    </div>
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
        }
        #input-title {
            font-size: 1.7rem;
        }
        button {
            border: 1px solid black;
            background-color: LightSeaGreen;
            font-size: 1.2rem;
            color: white;
            margin-right: 0.5rem;
        }
    `}</style>
</form>);

export default InputForm;
