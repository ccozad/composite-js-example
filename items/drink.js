module.exports = class Food {
    constructor(name, price, flavor, billingPriority, billingCode) {
        this.type = 'drink';
        this.options = {
            name: name,
            price: price,
            flavor: flavor,
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
            name: this.renderToString(),
            price: this.options.price,
            billingPriority: this.options.billingPriority,
            billingCode: this.options.billingCode
        }
    }

    renderToString() {
        if (this.options.flavor === undefined) {
             return `${this.options.name} - Drink`
        } else {
            return `${this.options.name} - ${this.options.flavor}`;
        }
    }
}