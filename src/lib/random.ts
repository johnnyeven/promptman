const randomInt = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomFloat = function (min: number, max: number) {
    return Math.random() * (max - min) + min;
}

const randomColorRGB = function () {
    const r = randomInt(0, 255);
    const g = randomInt(0, 255);
    const b = randomInt(0, 255);

    return `rgb(${r}, ${g}, ${b})`;
}

export { randomInt, randomFloat, randomColorRGB }