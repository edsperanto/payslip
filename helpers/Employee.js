// dependencies
import moment from "moment";

// constants
const MONTH_IN_YEAR = 12;
const START_DATE_FORMAT = "MM-DD";
const BRACKET_4_INCOME = 180000;
const BRACKET_3_INCOME = 87000;
const BRACKET_2_INCOME = 37000;
const BRACKET_1_INCOME = 18200;
const BRACKET_4_TAX = 0.45;
const BRACKET_3_TAX = 0.37;
const BRACKET_2_TAX = 0.325;
const BRACKET_1_TAX = 0.19;
const NAME_REGEX = "^[A-z]+$";
const NUM_REGEX = "^[0-9]+$";


// class definition
export default class Employee {

    constructor(firstName, lastName, salary, rate, startDate) {
        // check for problems
        this._nameRE = RegExp(NAME_REGEX);
        this._numRE = RegExp(NUM_REGEX);

        // check empty
        if(!firstName) throw new Error("Please enter First Name");
        if(!lastName) throw new Error("Please enter Last Name");
        if(!salary) throw new Error("Please enter Annual Salary");
        if(!rate) throw new Error("Please enter Super Rate");
        if(!startDate) throw new Error("Please enter Payment Start Date");

        // check valid format
        let validFn = this._nameRE.test(firstName);
        let validLn = this._nameRE.test(lastName);
        let validS = this._numRE.test(salary);
        let validR = this._numRE.test(rate);
        if(!validFn) throw new Error("Only use the English alphabet for First Name");
        if(!validLn) throw new Error("Only use the English alphabet for Last Name");
        if(!validS) throw new Error("Please enter an integer for Annual Salary");
        if(!validR) throw new Error("Please enter an integer for Super Rate");

        // check sanity
        let rateSmallerThanOne = rate <= 100;
        if(!rateSmallerThanOne) throw new Error("Super Rate cannot be bigger than 100%");

        // proceed if no problems
        this._id = Math.random().toString(36).substring(6);
        this._firstName = firstName;
        this._lastName = lastName;
        this._salary = salary;
        this._rate = rate;
        if(startDate.length > 5) {
            this._startDate = moment(startDate);
        } else {
            this._startDate = moment(startDate, START_DATE_FORMAT);
        }
    }

    set id(id) {
        this._id = id;
    }

    set firstName(fn) {
        this._firstName = fn;
    }

    set lastName(ln) {
        this._lastName = ln;
    }

    set salary(s) {
        this._salary = s;
    }

    set rate(r) {
        this._rate = r;
    }

    set startDate(sd) {
        if(sd.length > 5) {
            this._startDate = moment(sd);
        } else {
            this._startDate = moment(sd, START_DATE_FORMAT);
        }
    }

    get id() {
        return this._id;
    }

    get name() {
        return `${this._firstName} ${this._lastName}`;
    }

    get payPeriod() {
        const payPeriodStart = this._startDate.format("DD MMM");
        const payPeriodEnd = this._startDate.add(1, "months").format("DD MMM");
        return `${payPeriodStart} - ${payPeriodEnd}`;
    }

    get grossIncome() {
        return Math.round(this._salary/MONTH_IN_YEAR);
    }

    get incomeTax() {

        // variables
        var bracketTaxAmount, totalTax = 0;
        var taxableIncome = this._salary;

        // calculations
        if(taxableIncome > BRACKET_4_INCOME) {
            bracketTaxAmount = taxableIncome - BRACKET_4_INCOME;
            totalTax += (bracketTaxAmount) * BRACKET_4_TAX;
            taxableIncome -= bracketTaxAmount;
        }
        if(taxableIncome > BRACKET_3_INCOME) {
            bracketTaxAmount = taxableIncome - BRACKET_3_INCOME;
            totalTax += (bracketTaxAmount) * BRACKET_3_TAX;
            taxableIncome -= bracketTaxAmount;
        }
        if(taxableIncome > BRACKET_2_INCOME) {
            bracketTaxAmount = taxableIncome - BRACKET_2_INCOME;
            totalTax += (bracketTaxAmount) * BRACKET_2_TAX;
            taxableIncome -= bracketTaxAmount;
        }
        if(taxableIncome > BRACKET_1_INCOME) {
            bracketTaxAmount = taxableIncome - BRACKET_1_INCOME;
            totalTax += (bracketTaxAmount) * BRACKET_1_TAX;
            taxableIncome -= bracketTaxAmount;
        }

        // return result
        return Math.round(totalTax);

    }

    get netIncome() {
        return Math.round(this.grossIncome - this.incomeTax / MONTH_IN_YEAR);
    }

    get superAmount() {
        return Math.round(this.grossIncome * (this._rate/100));
    }

}
