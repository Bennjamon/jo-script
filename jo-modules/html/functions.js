var html = {
    get: (str, finder, arrayLimiters) => {
        var string = String(str + "~");
        var limiter = "~";
        for (let i = 0; i < arrayLimiters.length; i++) {
            if (string.includes(arrayLimiters[i])) {
                if ((string.indexOf(arrayLimiters[i]) == -1 || string.indexOf(arrayLimiters[i]) < string.indexOf(limiter)) && string.indexOf(arrayLimiters[i]) > string.indexOf(finder)) {
                    limiter = arrayLimiters[i];
                }
            }
        }
        if (limiter == "~") {
            return str.substr(str.indexOf(finder) + 1, str.length - str.indexOf(finder))
        }
        return str.substr(str.indexOf(finder) + 1, str.indexOf(limiter) - str.indexOf(finder) - 1);
    },
    ObjectDom: class {
        
    },
    select: (str) => {
        var id = html.get(str, "#", ["<", "."]);
        var className = html.get(str, ".", ["<", "#"]);
        var tagName = html.get(str, "<", [".", "#"]);

    }
};