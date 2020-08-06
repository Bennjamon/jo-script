[
    {
        name:"ready",
        mc:["html.ready:\r\n", "replacer"],
        js:["window.addEventListener('load', () => {\r\n", "replacer"],
        final:"\r\n}",
        regEx:/html\.ready:(\r\n\t(\S| )*)*\n/
    },
    {
        name:"select",
        mc:[["html.select(\"", "html.select('"], ["#", ".", ">"], "replacer", ["')", "\")"]],
        
    },
]