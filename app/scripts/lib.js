function getRandomInt(min, max) {
    min = min * 10;
    max = max * 10;
    return Math.floor(((Math.random() * (max - min + 1)) + min) / 10);
}