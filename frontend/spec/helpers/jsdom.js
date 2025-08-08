console.log('Loaded jsdom.js helper start');
try {
    const { JSDOM } = require('jsdom');

    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
        url: 'http://localhost',
    });

    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = {
        userAgent: 'node.js',
    };

    global.HTMLElement = dom.window.HTMLElement;
    global.Node = dom.window.Node;

    console.log('Loaded jsdom.js helper finish');
} catch (error) {
    console.error('Error in jsdom.js helper:', error);
}
