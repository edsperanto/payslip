// constants
const MONTH_IN_YEAR = 12;

// class definition
export default class Employee {

    // input details: first name, last name, annual salary, rate, start date
    constructor(firstName, lastName, salary, rate, startDate) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._salary = salary;
        this._rate = rate;
        this._startDate = startDate;
    }

    get name() {
        return `${this._firstName} ${this._lastName}`;
    }

    get payPeriod() {
        return this._startDate;
    }

    get grossIncome() {
        return Math.round(this._salary/MONTH_IN_YEAR);
    }

    get incomeTax() {
        // placeholder write full logic later
        return this._salary * this._rate;
    }

    get netIncome() {
        // questions regarding tax calculations
        return this.grossIncome - this.incomeTax / MONTH_IN_YEAR;
    }

    get superAmount() {
        return Math.round(this.grossIncome * this._rate);
    }

}
