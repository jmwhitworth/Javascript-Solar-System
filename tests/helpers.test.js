const helpers = require('../solarsystem/helpers');

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
    expect(helpers.debug("Test ID", "Test content")).toBeTruthy();
});
test.each(invalidStrings)('Debug handles invalid params', (invalidStrings) => {
    const validInput = "Valid string";
    expect(helpers.debug(validInput, invalidStrings)).toBeFalsy();
    expect(helpers.debug(invalidStrings, validInput)).toBeFalsy();
});

//validString()
test('validString works with valid strings', () => {
    expect(helpers.validString("Valid string")).toBeTruthy();
});
test.each(invalidStrings)('validString handles invalid strings or non-string inputs', (invalidStrings) => {
    expect(helpers.validString(invalidStrings)).toBeFalsy();
});
