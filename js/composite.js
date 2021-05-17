
function add(a, b) {
    return a + b;
}

function square(a) {
    return a * a
}

function plusOne(c) {
    return c + 1
}

const composite = (...args) => {
    return (...arguments) => {
        const init = args[0].apply(null, arguments)
        return args.slice(1).reduce((memo, current) => {
            return current(memo)
        }, init)
    }
}

var addAquqreAndPlusOne = composite(add, square, plusOne)
addAquqreAndPlusOne(1, 2);

