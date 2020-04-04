async function filter1(text) {
    return text === 'a';
}

for(let x of ['a','b','c']){
    console.log(filter1(x))
}