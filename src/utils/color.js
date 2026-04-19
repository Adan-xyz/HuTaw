const randomColor = parseInt(Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), 16);

module.exports = { randomColor };