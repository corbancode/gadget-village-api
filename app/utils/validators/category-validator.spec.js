const { validateCreateCategory, validateCreateSubCategory } = require('./category-validator');

describe('validate create category', () => {
    it('should resolve to true if name is more than 3 characters and less than 256 characters', () => {
        const body = { name: 'Mobile Phones' };
        return expect(validateCreateCategory(body)).resolves.toBeTruthy();
    });

    it('should reject and throw error if name is not a string, less than 3 characters or more than 256 characters', () => {
        const body = { name: 'M' };
        return expect(validateCreateCategory(body)).rejects.toThrow(Error);
    });

    it('should reject and throw error if name is not defined', () => {
        const body = { };
        return expect(validateCreateCategory(body)).rejects.toThrow(Error);
    });

});

describe('validate create sub category', () => {
    it('should resolve to true if name is more than 3 characters and less than 256 characters with category present', () => {
        const body = { name: 'Mobile Phones', category: '5d4af5515291da5960dd293e' };
        return expect(validateCreateSubCategory(body)).resolves.toBeTruthy();
    });

    it('should reject and throw error if name is not a string, less than 3 characters or more than 256 characters with category present', () => {
        const body = { name: 'M', category: '5d4af5515291da5960dd293e' };
        return expect(validateCreateSubCategory(body)).rejects.toThrow(Error);
    });

    it('should reject and throw error if category is not defined', () => {
        const body = { name: 'Mobile phones' };
        return expect(validateCreateSubCategory(body)).rejects.toThrow(Error);
    });

})