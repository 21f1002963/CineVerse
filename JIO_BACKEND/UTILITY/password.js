const bcrypt = require('bcrypt');

const password="Mk@8921550964!";

async function create(){
    console.time();
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);
    const isTheSame = await bcrypt.compare(password, hashedPassword);
    console.timeEnd();
    console.log('Hashed Password : ', hashedPassword);
}
create();