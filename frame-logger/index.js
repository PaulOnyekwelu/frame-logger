module.exports = (message, pattern) => {
    if(!message || !pattern){
        throw new Error('frame-print requires two positional arguments!')
    }
    message = message.toString();
    pattern = pattern.toString();
    console.log(pattern.repeat(message.length));
    console.log(message);
    console.log(pattern.repeat(message.length));
}
