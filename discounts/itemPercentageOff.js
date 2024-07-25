module.exports = class ItemPercentageOffTotal {
    constructor(targetBillingCode, percentageOff, billingPriority, billingCode) {
        this.type = 'itemPercentageOff';
        this.options = {
            name: `${percentageOff}% off item`,
            targetBillingCode: targetBillingCode,
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
        var targetItems = bill.items.filter(item => item.options.billingCode === this.options.targetBillingCode);
        targetItems = targetItems.sort((a, b) => b.options.price - a.options.price);
        if (targetItems.length === 0) {
            this.options.price = 0;
            return bill.total;
        } else {
            const discount = targetItems[0].options.price * (this.options.percentageOff / 100);
            this.options.price = -discount;
            bill.total -= discount;
            return bill.total;
        }
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