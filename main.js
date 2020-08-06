var evalCode = require("./evalCode.js")
var fs = require('fs');
var  configStatements = require("./configStatements.js");
var Statement = require("./Statement.js").Statement;

function create () {
    var statements = {};
    for (let i = 0; i < configStatements.length; i++) {
        statements[configStatements[i].name] = new Statement(configStatements[i].js, configStatements[i].mc, configStatements[i].regEx, configStatements[i].final);
    }
    return statements;
}

var file = "";
for (const key in process.argv) {
    if (process.argv.hasOwnProperty(key)) {
        if (process.argv[key].startsWith("file=")){
            file = process.argv[key].split("=")[1]
        }
    }
}

fs.readFile(file + ".jo", function (err, data) {
    if (err) throw(err);
    var finalData = String(data);
    var statements = create();
    evalCode(finalData)
    fs.readFile("./constsVars.js", function (err, data2) {
        if (err) throw(err);
        finalData = evalCode(finalData, statements);
        finalData = data2 + "\n" + finalData;
        fs.stat(file + ".js", function(err1) {
            if (!err1) {
                fs.unlink(file + ".js", (err2) => {
                    if (err2) throw(err2) 
                    fs.appendFile(file + ".js", finalData, (err3) => {
                        if (err3) throw(err3)
                    })
                })
            } else {
                fs.appendFile(file + ".js", finalData, (err4) => {
                    if (err4) throw(err4)
                })
            }
            
        });
    })
})