const fs = require("fs");
const { argv } = require("process");

// If -debug in argv
if (argv.includes("-debug")) {
    console.log("\nDebug mode enabled\n");
}

function print(text) {
  console.log(text);
}

const defset = 'const fs = require("fs");\nconst Discord = require("discord.js");\nconst Database = require("easy-json-database");\nconst devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;\nconst delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconst s4d = {\n    Discord,\n    database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/db.json`),\n    joiningMember:null,\n    reply:null,\n    tokenInvalid:false,\n    tokenError: null,\n    checkMessageExists() {\n        if (!s4d.client) throw new Error("The bot does not have the neccecary files to run. To install the required files, run the following command: dpl install");\n        if (!s4d.client.readyTimestamp) throw new Error("The bot could not connect to the neccecary websites. Please check your internet connection and try again.");\n    }\n   };\ns4d.client = new s4d.Discord.Client({\n    intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],\n    partials: ["REACTION"]\n});\n\n'

// Start of Workspace

if (argv[2] == "add") {
    if (argv[3] == "-w" || argv[3] == "workspace") {
        WPName = argv[4];
        if (fs.existsSync(`./${WPName}`)) {
            print("\nWorkspace already exists. Please choose another name.\n");
        } else {
            print("\nAdding workspace '" + WPName + "' to this folder\n");
            // Create workspace folder in Documents without using S4D
            fs.mkdirSync(`./${WPName}`);
            if (fs.existsSync(`./${WPName}`)) {
                print("Workspace '" + WPName + "' added successfully\n");
            } else {
                print("Workspace '" + WPName + "' could not be added\n");
            }
        }
    }
} else if (argv[2] == "remove") {
    if (argv[3] == "-w" || argv[3] == "workspace") {
        WPName = argv[4];
        if (fs.existsSync(`./${WPName}`)) {
            print("\nRemoving workspace '" + WPName + "' from this folder\n");
            // Remove workspace folder in Documents without using S4D
            fs.rmdirSync(`./${WPName}`, { recursive: true });
            if (!fs.existsSync(`./${WPName}`)) {
                print("Workspace '" + WPName + "' removed successfully\n");
            } else {
                print("Workspace '" + WPName + "' could not be removed\n");
            }
        } else {
            print("\nWorkspace '" + WPName + "' does not exist.\n");
        }
    }
// End of Workspace

} else {
    file = argv[2];

    if (file == undefined) {
        console.log("Location Error | No File Specified");
        } else {
        // Read File as a text file
        fs.readFile(file, "utf8", function(err, data) {
            if (err) {
                console.log("File Error | " + err);
            } else {
                var lines = data.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].includes("settings = ")) {
                        if (argv.includes("-debug")) {
                            print("Found settings\n");
                        }
                        var settings = lines[i].split("settings = ")[1];
                        settings = settings.split(";")[0];
                        if (settings == "default") {
                            if (argv.includes("-debug")) {
                                print(" Settings are default\n");
                            }
                            fs.writeFile("bot.js", defset, function(err) {
                                if (err) {
                                    if (argv.includes("-debug")) {
                                        console.log("   File Error | Error writing settings to bot.js | Error: " + err + "\n");
                                    } else {
                                        console.log("   File Error | Error: Could not write to file\n");
                                    }
                                } else {
                                    if (argv.includes("-debug")) {
                                        console.log("Write Success | Successfully wrote default settings to bot.js\n");
                                    }
                                }
                            })
                        }
                    }
                    
                    if (lines[i].includes("token =")) {
                        if (argv.includes("-debug")) {
                            print("Found token\n");
                        }
                        var token = lines[i].split("token = ")[1];
                        token = token.split(";")[0];
                        if (token == "" || token == " " || token == undefined) {
                            if (argv.includes("-debug")) {
                                print(" Token is empty.\n");
                            }
                        } else {
                            if (argv.includes("-debug")) {
                                if (argv.includes("-show")) {
                                    print(" Token is '" + token + "' (To keep from showing this, do not use '-show' when running dpl)\n");
                                } else {
                                    print(" Token not shown for safety reasons (To show token and other confidential things, use '-show`)\n");
                                }
                            }
                            fs.appendFile("bot.js", "s4d.client.login('" + token + "').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });\nif (s4d.tokenInvalid) {\n    console.error(\"Your bot's token is invalid. Please check your token at discord.com/developers/applications\");\n    process.exit(1);\n}\n\nif (s4d.tokenError) {\n    console.error('There was an issue connecting to Discord. Please check your wifi.');\n}\n\n", function(err) {
                                if (err) {
                                    if (argv.includes("-debug")) {
                                        console.log("   File Error | Error writing token to bot.js | Error: " + err + "\n");
                                    } else {
                                        console.log("   File Error | Error: Could not write to file\n");
                                    }
                                } else {
                                    if (argv.includes("-debug")) {
                                        console.log("Write Success | Successfully wrote token to bot.js\n");
                                    }
                                }
                            })
                        }
                    }

                    if (lines[i].includes("activity =")) {
                        if (argv.includes("-debug")) {
                            print("Found activity\n");
                        }
                        var activitySplit = lines[i].split("activity = ")[1];
                        const activity = activitySplit.split(";")[0];
                        if (argv.includes("-debug")) {
                            print(" Activity: " + activity + "\n");
                        }
                        if (activity == "" || activity == " " || activity == undefined) {
                            if (argv.includes("-debug")) {
                                print(" Activity is empty.\n");
                            }
                        } else {
                            var content = activity.replace(/'/g, "\\'");
                            var content = content.replace(/"/g, '\\"');
                            fs.writeFileSync("temp.json", "{\"activity\": \"" + content + ";\"}", function(err) {
                                if (err) {
                                    if (argv.includes("-debug")) {
                                        console.log("   File Error | Error writing activity to temp.json | Error: " + err + "\n");
                                    } else {
                                        console.log("   File Error | Error: Could not write to file\n");
                                    }
                                } else {
                                    if (argv.includes("-debug")) {
                                        console.log("Write Success | Successfully wrote activity to temp.json\n");
                                    }
                                }
                            })
                        }
                    }

                    if (lines[i].includes("ready;")) {
                        var tempjs = fs.readFileSync("temp.json", "utf8");
                        // Decode activity from JSON to JS object
                        var activity = JSON.parse(tempjs);
                        activity = activity.activity;
                        // Delete all new lines from activity
                        activity = activity.replace(/\n/g, "");
                        activity = activity.replace(/'/g, "'");
                        activity = content.replace(/"/g, '"');
                        // Delete all " and '
                        if (argv.includes("-debug")) {
                            print("Ready found. Client Ready.\n");
                        }
                        var activityType = activity.split(" ")[0];
                        if (argv.includes("-debug")) {
                            print(" Activity Type is '" + activityType + "'\n");
                        }
                        var activityText = activitySplit.split(" ")[1].split(";")[0];
                        if (argv.includes("-debug")) {
                            print(" Activity Text is '" + activityText + "'\n");
                        }
                        fs.appendFile("bot.js", "s4d.client.on('ready', () => {\n    console.log(`Logged in as ${s4d.client.user.tag}!`);\n    s4d.client.user.setActivity('" + activityText + "', { type: " + activityType.toUpperCase() + "});\n});\n", function(err) {
                            if (err) {
                                if (argv.includes("-debug")) {
                                    console.log("   File Error | Error writing 'client.on' function to bot.js | Error: " + err + "\n");
                                } else {
                                    console.log("   File Error | Error: Could not write to file\n");
                                }
                            } else {
                                if (argv.includes("-debug")) {
                                    console.log("Write Success | Successfully wrote 'client.on' function to bot.js\n");
                                }
                            }
                        })
                    }

                    if (lines[i].includes("on msg")) {
                        if (argv.includes("-debug")) {
                            print("Found on msg\n");
                        }
                        fs.appendFile("bot.js", 's4d.client.on("message", async (message) => {', function(err) {
                            if (err) {
                                if (argv.includes("-debug")) {
                                    console.log("   File Error | Error writing `on msg` to bot.js | Error: " + err + "\n");
                                } else {
                                    console.log("   File Error | Error: Could not write to file\n");
                                }
                            } else {
                                if (argv.includes("-debug")) {
                                    console.log("Write Success | Successfully wrote on msg to bot.js\n");
                                }
                            }
                        })
                    }
                }
            // End of Compiler

            fs.unlinkSync("temp.json");

            print("\nCompiling Complete!\n");
            }
        })
    }
}
