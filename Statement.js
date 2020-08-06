class Statement {
    constructor(js, myCode, RegEx, final= "") {
        if (js.length === myCode.length) {
            this.js = js;
            this.myCode = myCode;
            this.RegEx = RegEx;
            this.final = final;
        } else {
            console.error('Wrong number of arguments, JS: ' + js.length + ', myCode: ' + myCode.length);
            process.exit(1);
        }
    }
    convertCode(str) {        
        let strFinal = String(str);
        for (let i = 0; i < this.myCode.length; i++) {
            if (typeof this.myCode[i] === "string") {
                if (this.myCode[i] != "replacer") {
                    if (strFinal.indexOf(this.myCode[i]) !== -1) {
                        if (this.js[i] != "replacer") {
                            strFinal = strFinal.replace(this.myCode[i], this.js[i]);
                        }
                    } else {   
                        console.log(this.myCode[i]);
                        return;
                    }
                }
            } else {
                let valid = false;
                for (let j = 0; j < this.myCode[i].length; j++) {
                    
                    if (strFinal.indexOf(this.myCode[i][j]) !== -1) {
                        valid = true;
                        if (Array.isArray(this.js[i])) {
                            strFinal = strFinal.replace(this.myCode[i][j], this.js[i][j]);
                        } else {
                            strFinal = strFinal.replace(this.myCode[i][j], this.js[i])
                        }
                    }
                }
                if (!valid) {
                    console.log(this.myCode[i]);
                    return;
                }
            }
        }
        strFinal += this.final;
        return strFinal;
    }
}

module.exports.Statement = Statement;