const {isValidString} = require('./validation');

describe('isValidString', () => {
    test('should reject non-string values', () => {
        var result = isValidString(5);
        expect(result).toBe(false);
        result = isValidString({test});
        expect(result).toBe(false);
        result = isValidString();
        expect(result).toBe(false);
    });

    test('should reject string with only spaces', () => {
        var result = isValidString('                ');
        expect(result).toBe(false);
    })

    test('should allow string with non-space characters', () => {
        var result = isValidString('test');
        expect(result).toBe(true);
        result = isValidString('{test}');
        expect(result).toBe(true);
        result = isValidString('    test    ');
        expect(result).toBe(true);
        result = isValidString('5');
        expect(result).toBe(true);
    });
});