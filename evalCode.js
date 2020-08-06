function evalCode (str, objStatements) {
    strEE = str;
    strFinal = str;
    for (const key in objStatements) {
        if (objStatements.hasOwnProperty(key)) {
            while (strFinal.match(objStatements[key].RegEx) !== null) {
                strFinal = strFinal.replace(strFinal.match(objStatements[key].RegEx)[0], objStatements[key].convertCode(strFinal.match(objStatements[key].RegEx)[0]));
                console.log(strEE.match(objStatements[key].RegEx)[0])
            }
        }
    }
    return strFinal;
}
module.exports = evalCode;