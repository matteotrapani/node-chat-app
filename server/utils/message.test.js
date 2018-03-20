var {generateMessage} = require('./message');

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
})