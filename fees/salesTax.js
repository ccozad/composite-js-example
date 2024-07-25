module.exports = class SalesTax {
    constructor(taxPercentage, municipality, billingPriority, billingCode) {
        this.type = 'salesTax';
        this.options = {
            name: `${taxPercentage}% ${municipality} sales tax`,
            taxPercentage: taxPercentage,
            municipality: municipality,
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
        const tax = bill.total * (this.options.taxPercentage / 100);
        this.options.price = tax;
        bill.total += tax;
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