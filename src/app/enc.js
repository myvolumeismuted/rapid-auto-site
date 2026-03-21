const testObject = {
    orange: "graan",
    2: "blue",
    3: "Four"
}

const {orange, ...newSa} = testObject
console.log(newSa)