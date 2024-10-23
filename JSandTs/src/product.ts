class Product {
    name: string;
    price: number;
    category: string;
    private static productCount: number = 0;

    constructor(name: string, price: number, category: string) {
        this.name = name;
        this.price = price;
        this.category = category;
        Product.productCount++;
    }

    updatePrice(newPrice: number): void {
        this.price = newPrice;
    }

    getProductInfo(): string {
        return `Product Name: ${this.name}, Price: $${this.price}, Category: ${this.category}`;
    }

    static totalProducts(): number {
        return Product.productCount;
    }
}

class DiscountedProduct extends Product {
    discountRate: number;

    constructor(name: string, price: number, category: string, discountRate: number) {
        super(name, price, category);
        this.discountRate = discountRate;
    }

    getProductInfo(): string {
        const discountedPrice = this.price * (1 - this.discountRate / 100);
        return `Product Name: ${this.name}, Original Price: $${this.price}, Discount: ${this.discountRate}%, Final Price: $${discountedPrice.toFixed(2)}, Category: ${this.category}`;
    }
}

interface Customer {
    name: string;
    email: string;
    orders: Product[];
}

function getCustomerInfo(customer: Customer): void {
    console.log(`Customer Name: ${customer.name}`);
    console.log(`Customer Email: ${customer.email}`);
    console.log(`Number of Orders: ${customer.orders.length}`);
}

class OrderManager<T> {
    private orders: T[] = [];

    addOrder(order: T): void {
        this.orders.push(order);
    }

    getAllOrders(): T[] {
        return this.orders;
    }
}

function createPriceMultiplier(multiplier: number) {
    return (price: number): number => price * multiplier;
}

const applyVAT = createPriceMultiplier(1.07);

async function fetchProductData() {
    try {
        const productData = await new Promise<{ name: string, price: number, category: string }>((resolve, reject) => {
            setTimeout(() => {
                const success = true;
                if (success) {
                    resolve({ name: 'Smartphone', price: 799, category: 'Electronics' });
                } else {
                    reject('Failed to fetch product data');
                }
            }, 2000);
        });
        console.log('Product data fetched successfully:', productData);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

function parseProductData(jsonData: string) {
    try {
        const productData = JSON.parse(jsonData);
        if (!productData.name || !productData.price || !productData.category) {
            throw new Error("Invalid product data format.");
        }
        return productData;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error parsing product data:', error.message);
            return `Error: ${error.message}`;
        } else {
            console.error('Unexpected error:', error);
            return 'Error: An unexpected error occurred.';
        }
    }
}

// ตัวอย่างการใช้งาน ฟังก์ชั่นต่างๆ 
const validJson = '{ "name": "Laptop", "price": 1200, "category": "Electronics" }';
const parsedData = parseProductData(validJson);
console.log('Parsed Data:', parsedData);
const invalidJson = '{name: "Laptop", price: 1200, category: "Electronics"}'; 
const invalidParsedData = parseProductData(invalidJson);
console.log('Parsed Invalid Data:', invalidParsedData);

const products = [
    { name: 'Laptop', price: 1200, category: 'Electronics' },
    { name: 'Phone', price: 800, category: 'Electronics' },
    { name: 'Computer', price: 12000, category: 'Electronics' },
    { name: 'Monitor', price: 250, category: 'Electronics' },
    { name: 'Snack', price: 5, category: 'Food' }
];

const expensiveProducts = products.filter(product => product.price > 100);
console.log('Products priced above $100:', expensiveProducts); //แสดงสินค้าราคามากกว่า 100
const productNames = products.map(product => product.name);
console.log("Product Names:", productNames); //แสดงชื่อสินค้า
const totalPrice = products.reduce((total, product) => total + product.price, 0);
console.log("Total price of all products:", totalPrice); //แสดงราคารวมของสินค้าในproducts

//ตัวอย่างการจัดการคำสั่งซื้อ
const orderManager = new OrderManager<Product>();
const customer: Customer = { name: "Nut", email: "nut@mail.com", orders: [new Product('Laptop', 1200, 'Electronics')] };
orderManager.addOrder(new Product("TV", 1500, "LG"));
console.log(orderManager.getAllOrders());
getCustomerInfo(customer);
fetchProductData();
console.log('Parsed Data:', parsedData);
console.log('Parsed Invalid Data:', invalidParsedData);
