module.exports = class Food {
    constructor(name, billingPriority, billingCode) {
        this.type = 'combo';
        this.options = {
            name: name,
            price: 0,
            billingPriority: billingPriority,
            billingCode: billingCode
        };
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        this.options.price += item.options.price;
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
        const itemNames = this.items.map(item => item.options.name).join(', ');
        return {
            type: this.type,
            name: `${this.renderToString()}`,
            price: this.options.price,
            billingPriority: this.options.billingPriority,
            billingCode: this.options.billingCode
        }
    }

    renderToString() {
        const itemsText = this.items.map(item => item.renderToString()).join(', ');
        return `${this.options.name}: ${itemsText}`;
    }
}