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

// class definition
export default class Employee {

    constructor(firstName, lastName, salary, rate, startDate) {
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
        return Math.round(this.grossIncome * this._rate);
    }

}
