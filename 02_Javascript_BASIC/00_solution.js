function joinedLogger(level, sep) {
    return function (...args) {
        let textToLog = "";
        for (let i = 0; i < args.length; i++) {
            if (args[i].level >= level) {
                textToLog += args[i].text + ";";
            }
        }
        console.log(textToLog);
    }
}

messages = [
    {
        level: 10,
        text: "foo"
    },
    {
        level: 20,
        text: "bar"
    },
    {
        level: 30,
        text: "baz"
    }
];

function inner(...args) {
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
}


inner(messages[0], messages[1], messages[2])