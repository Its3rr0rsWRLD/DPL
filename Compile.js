const fs = require("fs");
const { argv } = require("process");

file = argv[2];

if (file == undefined) {
    console.log("Location Error | No File Specified");
    }
else {
    // Read File as a text file
    fs.readFile(file, "utf8", function(err, data) {
        if (err) {
            console.log("File Error | Error: No suck file or directory, open '" + file + "'");
        } else {
            // If file contains "settings", then split it after "settings"
            if (data.includes("settings")) {
                var split = data.split("settings ");
                var settings = split[0];
                var code = split[1];
                // Open "bot.js" and write settings
                fs.writeFile("bot.js", settings, function(err) {
                    if (err) {
                        console.log("File Error | " + err);
                    } else {
                        // Open "bot.js" and write code
                        fs.appendFile("bot.js", 'const Discord = require("discord.js");\nconst Database = require("easy-json-database");\nconst devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;\nconst delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconst s4d = {\n    Discord,\n    database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/db.json`),\n    joiningMember:null,\n    reply:null,\n    tokenInvalid:false,\n    tokenError: null,\n    checkMessageExists() {\n        if (!s4d.client) throw new Error("The bot does not have the neccecary files to run. To install the required files, run the following command: dpl install");\n        if (!s4d.client.readyTimestamp) throw new Error("The bot could not connect to the neccecary websites. Please check your internet connection and try again.");\n    }\n   };\ns4d.client = new s4d.Discord.Client({\n    intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],\n    partials: ["REACTION"]\n});\n\nconst synchronizeSlashCommands = require("@frostzzone/discord-sync-commands");', function(err)
                        {   
                            if (err) {
                                console.log("File Error | " + err);
                            } else {
                                console.log("File Success | File Saved");
                            }
                        })
                    }
                })
            } else {
                console.log("Compile Successful");
            }
        }
    })
}