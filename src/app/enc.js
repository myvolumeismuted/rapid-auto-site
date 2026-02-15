const bcrypt = require("bcrypt")

async function hash() {
    const hashedpass = await bcrypt.hash("Kameren1!", 12)
    console.log(hashedpass)
}


hash()