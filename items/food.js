module.exports = class Food {
    constructor(name, price, billingPriority, billingCode) {
        this.type = 'food';
        this.options = {
            name: name,
            price: price,
            billingPriority: billingPriority,
            billingCode: billingCode
        };
    }

    get billingPriority() {
        return this.options.billingPriority;
    }

    get billingCode() {
        return this.options.billingCode;
    }

    //Bill entry support
    calculate(bill) {
        bill.total += this.options.price;
        return bill.total;
    }

    renderToObject() {
        return {
            type: this.type,
            name: this.options.name,
            price: this.options.price,
            billingPriority: this.options.billingPriority,
            billingCode: this.options.billingCode
        }
    }

    renderToString() {
        return `${this.options.name}`;
    }
}