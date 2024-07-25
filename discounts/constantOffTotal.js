module.exports = class ConstantOffTotal {
    constructor(constantOff, billingPriority, billingCode) {
        this.type = 'constantOffTotal';
        this.options = {
            name: `Up to $${constantOff} off total`,
            constantOff: constantOff,
            billingPriority: billingPriority,
            billingCode: billingCode
        };
        this.items = [];
    }

    get billingPriority() {
        return this.options.billingPriority;
    }

    get billingCode() {
        return this.options.billingCode;
    }

    //Bill entry support
    calculate(bill) {
        // The total discount cannot exceed the total bill
        const discount = bill.total > this.options.constantOff ? this.options.constantOff : bill.total;
        this.options.price = -discount;
        bill.total -= discount;
        return bill.total;
    }

    // Price is undefined until calculate is called
    renderToObject() {
        const itemNames = this.items.map(item => item.options.name).join(', ');
        return {
            type: this.type,
            name: this.options.name,
            price: this.options.price,
            billingPriority: this.options.billingPriority,
            billingCode: this.options.billingCode
        }
    }

    renderToString() {
        return this.options.name;
    }
}