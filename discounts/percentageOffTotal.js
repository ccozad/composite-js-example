module.exports = class PercentageOffTotal {
    constructor(percentageOff, billingPriority, billingCode) {
        this.type = 'percentageOffTotal';
        this.options = {
            name: `${percentageOff}% off total`,
            percentageOff: percentageOff,
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
        const discount = bill.total * (this.options.percentageOff / 100);
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