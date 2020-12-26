function joinedLogger(level, sep) {
    return function (...args) {
        let textToLog = "";
        for (let i = 0; i < args.length; i++) {
            if (args[i].level >= level) {
                textToLog += args[i].text + sep;
            }
        }
        console.log(textToLog);
    }
}



inner(messages[0], messages[1], messages[2])