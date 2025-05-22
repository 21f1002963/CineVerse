const OTPgenerator = function(){
    return Math.floor((Math.random() * 900000) + 100000);
}

module.exports = OTPgenerator;