const Payslip = ({ employee }) => {
    return <li>
        <div>{`Name: ${employee.name}`}</div>
        <div>{`Pay Period: ${employee.payPeriod}`}</div>
        <div>{`Gross Income: ${employee.grossIncome}`}</div>
        <div>{`Income Tax: ${employee.incomeTax}`}</div>
        <div>{`Net Income: ${employee.netIncome}`}</div>
        <div>{`Super Amount: ${employee.superAmount}`}</div>
        <style jsx>{`
            li {
                border: 2px solid black;
                padding: 0.5rem;
            }
        `}</style>
    </li>
};

export default Payslip;
