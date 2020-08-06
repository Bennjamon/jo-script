var modules = {}
var fs = require("fs")
function loadModule(name) {
    fs.readFile(`./jo-modules/${name}/Statements.js`, (err, data) => {
        modules[name] = {};
        modules[name].Statements = eval(String(data));
    })
}
loadModule("html")