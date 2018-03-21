var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    test('should generate the correct message object', () => {
        var from = 'TestSender';
        var text = 'Test text';

        var message = generateMessage(from, text);
        expect(message).not.toBeNull();
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    test('should generate the correct location message object', () => {
        var from = 'TestSender';
        var latitude = 100;
        var longitude = 200;

        var message = generateLocationMessage(from, latitude, longitude);
        expect(message).not.toBeNull();
        expect(message.from).toBe(from);
        expect(message.url).toBe('https://www.google.com/maps?q=100,200');
        expect(typeof message.createdAt).toBe('number');
    });
});