import CameraGroup from '../../app/classes/CameraGroup';

let camera = new CameraGroup(true, 1, 1);

const notNumbers = [
    'string', {0:'Obj'}, [0,1], null, true, false
];


// _setMousePosition()
test('_setMousePosition updates the _savedMousePosition attribute', () => {
    camera._setMousePosition();
    expect(camera._savedMousePosition.x).toEqual(0);
});

test.each(notNumbers)('_setMousePosition handles invalid inputs', (input) => {
    expect(() => {
        camera._setMousePosition(0, input);
    }).toThrow(TypeError);

    expect(() => {
        camera._setMousePosition(input, 0);
    }).toThrow(TypeError);
})


// _getMousePosition()
test('_getMousePosition returns expected', () => {
    const expected = {x:10, y:20};
    camera._setMousePosition(expected.x, expected.y);
    expect(camera._getMousePosition()).toEqual(expected);
});


// debug()
test.each([true, false])('Debug sets _debug attribute', (expected) => {
    camera.debug(expected);
    expect(camera._debug).toEqual(expected)
});
