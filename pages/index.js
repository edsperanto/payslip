// extract helpers
import helpers from "../helpers";
const { Employee } = helpers;

// testing ground
var Edward = new Employee("Edward", "Gao", 1000, 0.09, 2);

export default () => (
    <div>
        <h1>Payslip</h1>
        <div>{`Name: ${Edward.name}`}</div>
        <div>{`Pay Period: ${Edward.payPeriod}`}</div>
        <div>{`Gross Income: ${Edward.grossIncome}`}</div>
        <div>{`Income Tax: ${Edward.incomeTax}`}</div>
        <div>{`Net Income: ${Edward.netIncome}`}</div>
        <div>{`Super Amount: ${Edward.superAmount}`}</div>
    </div>
);
