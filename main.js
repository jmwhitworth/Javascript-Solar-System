import debug from "./solarsystem/helpers";

class Testing
{
    test()
    {
        this.hehe = true;
    }
}

const myTest = new Testing();

console.log(debug("thisId", "thisContent"));
console.log(debug("", "thisContent"));

