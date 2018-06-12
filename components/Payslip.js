const Payslip = ({ employee }) => {
    return <div>
        <h1>Payslip</h1>
        <div>{`Name: ${employee.name}`}</div>
        <div>{`Pay Period: ${employee.payPeriod}`}</div>
        <div>{`Gross Income: ${employee.grossIncome}`}</div>
        <div>{`Income Tax: ${employee.incomeTax}`}</div>
        <div>{`Net Income: ${employee.netIncome}`}</div>
        <div>{`Super Amount: ${employee.superAmount}`}</div>
    </div>
};

export default Payslip;
