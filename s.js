function getType (obj) { 
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            var types = [];
            for (var i = 0; i < obj.length; i++) {
                if (!types.includes(getType(obj[i]))) {
                    types.push(getType(obj[i]))
                    if (i === 0) {
                        type += getType(obj[i]);
                    } else {
                        type += "|" + getType(obj[i])
                    }
                }
            }
            type += "[]";
            return type;
        } else {
            var type = "{";
            for (var key in obj) {
                type += "\n";
                type += `${key}: ${getType(obj[key])}`
            }
            type += "\n}"
            return type;
        }
    } else {
        return typeof obj;
    }
}

function type(target, name, type, typeVar) {
    if (name in target) {
        console.log("Error: La " + typeVar == "var"? "variable" : "constante " + name + " ya esta definida como " + target[name].type);
        process.exit(1);
    } else {
        target[name] = {evalFunction: evalFunction, type: type}
    }
}
var handlerVars = {
    get: function(target, name) {
        if (name in target) {
            if ("value" in target[name]) {
                return target[name].value;
            } else {
                console.log("Error: La variable " + name + " no esta definida");
                process.exit(2);
            }
        } else {
            console.log("Error: La variable " + name + " no esta deeclarada");
            process.exit(3)
        }
    },
    set: function(target, name, value) {
        if (name in target) {
            if (target[name].evalFunction(value)) {
                target[name].value = value;
            } else {
                console.log("Error: No puedes darle un valor " + typeof value + " a una variable " + target[name].type);
                process.exit(4)
            }
        } else {
            console.log("Error: La variable " + name + " no esta declarada");
            process.exit(5)
        }
    }
};
var vars = new Proxy({}, handlerVars);
var handlerConst = {
    set: function(target, name, value) {
        if (name in target) {
                if (target[name].evalFunction(value)) {
                    target[name].value = value;
                } else {
                    console.log("Error: No puedes darle un valor " + typeof value + " a una constante " + target[name].type);
                    process.exit(6);
                } 
        } else {
            console.log("Error: La constante " + name + " no esta declarada")
        }
    },
    get
}
var consts = new Proxy({}, handlerConst)
type(consts, 'a', ' replacer', 'const')
consts.a = 0