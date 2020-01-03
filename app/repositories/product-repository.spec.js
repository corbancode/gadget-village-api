const { getProducts, getProduct } = require('./product-repository');

describe('get product', () => {
    it('should return an object with contains the id property', async () => {
        const id = '5d9cb78c0915f23e4c14a44a';
        await expect(getProduct(id)).resolves.toMatchObject({_id: '5d9cb78c0915f23e4c14a44a'});
    });

});

describe('get products', () => {
    it('should return an array with contains products', async () => {
        await expect(getProducts(1, 2)).resolves.length..toBeGreaterThanOrEqual(0);
    });

});