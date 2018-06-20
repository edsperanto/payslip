# Employee Payslip

This web app is used for creating employee payslips based on user input. The source code could be found [here](https://github.com/edsperanto/payslip).

### Assumtions

The user provides the first-name, last-name, annual-salary, super-rate, and payment-start-date for each employee, and the following values are derived from the provided values:

| Output | Details |
| --- | --- |
| name | [first-name] [last-name] |
| pay-period | one month pay period in format "DD MMM - DD MMM" from the start date to end date |
| gross-income | annual-salary / 12 |
| income-tax | calculated using annual-salary based on [Australian Resident tax rates 2017-18](https://www.ato.gov.au/Rates/Individual-income-tax-rates/) |
| net-income | gross-income - income-tax / 12 |
| super-amount | gross-income * super-rate |

### How to run

Clone the Github repository from the link mentioned above, or by running the following in your terminal

```
git clone https://github.com/edsperanto/payslip
```

Change directory into the repository and run

```
npm install
npm run dev -- -p [port_num]
```

Finally, you can visit the site on your computer by typing

```
localhost:[port_num]
```

into your browser address bar.

### Test Input

| Field | Value |
| --- | --- |
| First Name | Edward |
| Last Name | Gao |
| Annual Salary | 10000 |
| Super Rate | 0.9 |
| Payment Start Date | 06-22 |

### Test Output

| Field | Value |
| --- | --- |
| Name | Edward Gao |
| Pay Period | 22 Jun - 22 Jul |
| Gross Income | $833 |
| Income Tax | $0 |
| Net Income | $833 |
| Super Amount | $750 |

### How it's made

This Web Application was created using [Node.js](https://nodejs.org/en/), [React](https://reactjs.org/), [Next.js](https://nextjs.org/), and [Moment.js](https://momentjs.com/).
