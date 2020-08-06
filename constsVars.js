function getType (obj) { 
    switch (obj.constructor) {
        case Array:
            var arrayTypes = [];
            var string = "";
            obj.forEach(element => {
                if (!arrayTypes.includes(getType(element))) {
                    arrayTypes.push(getType(element));
                    string += obj.indexOf(element) == 0 ? getType(element) : "|" + getType(element)
                }
            });
            return string + "[]";
            break;
        case Object:
            var string = "{";
            
            for (const key in obj) {
                string += `${key}: ${getType(obj[key])},\n`
            }
            return string;
            break;
        default:
            return obj.constructor.toString().substr(obj.constructor.toString().indexOf(" ") + 1 , obj.constructor.toString().substr(obj.constructor.toString().indexOf(" ") + 1).indexOf("("))
            break;
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
function isEqual(array1, array2) {
    var final = true;
    if (array1.length == array2.length) {
        for (let i = 0; i < array1.length; i++) {
            if (!array2.includes(array1[i])) {
                final = false;
            }
        }
    } else {
        final = false;
    }
    return final;
}

function stringArray (string) {
    return string.startsWith("{") ? string.replace(/\n| |\t/g, "").substr(1, string.replace(/\n| |\t/g, "").length - 2).split(",") : string.replace(/\n| |\t/g, "").substr(0, string.length - 2).split(",")
}

console.log(isEqual(stringArray(getType({aa: 9, b:''})), stringArray(getType({b:'xa', aa:9}))))