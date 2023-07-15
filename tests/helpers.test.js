//const helpers = require('../solarsystem/helpers');
import {debug, validString} from '../models/helpers';

const invalidStrings = [
    [1],
    [0.1],
    [{}],
    [[]],
    [""],
    [null]
];

beforeAll(() => {
    // Adds a div with the ID 'debug' to the DOM. Used by debug function.
    const debugDiv = document.createElement('div');
    debugDiv.id = "debug";
    document.body.appendChild(debugDiv);
});

//debug()
test('Debug runs with valid params', () => {
    expect(debug("Test ID", "Test content")).toBeTruthy();
});
test.each(invalidStrings)('Debug handles invalid params', (invalidStrings) => {
    const validInput = "Valid string";
    expect(debug(validInput, invalidStrings)).toBeFalsy();
    expect(debug(invalidStrings, validInput)).toBeFalsy();
});

//validString()
test('validString works with valid strings', () => {
    expect(validString("Valid string")).toBeTruthy();
});
test.each(invalidStrings)('validString handles invalid strings or non-string inputs', (invalidStrings) => {
    expect(validString(invalidStrings)).toBeFalsy();
});
