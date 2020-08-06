var configStatements = [
    {
        name:"ConstType",
        mc:["$", "replacer", [":", ": ", " : ", " : "], ["String", "Number", "Boolean", "Array"]],
        js:["type(consts,'", "replacer", "', '", "replacer"],
        final:"', 'const')",
        regEx:/\$(\S*)((:| :|: | : )*)(String|Number|Boolean|Array)/
    },
    {
        name:"if",
        js:["if(", "replacer", "){", "replacer"],
        mc:[["if (", "if("], "replacer", [") :", "):"], "replacer"],
        final:"}",
        regEx:/if( |)\((\S| )\)( |):(\r\n    (\S| )*)*\r\n/
    },
    {
        mc:[["elif(", "elif ("], "replacer", [") :", "):"], "replacer", ],
        js:["else if(", "replacer", "){", "replacer"],
        final: "}",
        regEx:/elif( |)\((\S| )*\):(\r\n    (\S| )*)*\r\n/
    },
    {
        mc:["func ", "replacer", ["(", " ("], "replacer", [") :", "):"], "replacer"],
        js:["function ", "replacer", "(", "replacer", "){", "replacer"],
        final: "}",
        name:"func",
        regEx:/func (\S)*( |)\((\S| )*\):(\r\n    (\S| )*)*\r\n/
    },
    {
        mc:["else:", "replacer"],
        js:["else{", "replacer"],
        final: "}",
        name:"else",
        regEx:/else:(\r\n    (\S| )*)*\r\n/
    },
    {
        name:"var",
        mc:["#", "replacer"],
        js:["vars.", "replacer"],
        regEx:/\#(\S*)(=| = |= | =)(\S);/
    },
    {
        name:"const",
        mc:["$", "replacer"],
        js:["consts.", "replacer"],
        regEx:/\$(\S*)/
    }, 
]

module.exports = configStatements;