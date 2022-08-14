<p align="center">
  <img src="https://github.com/ThatError404/DPL/raw/master/DPL.png" width="250"/>
</p>
<h2 align="center" width="200"><b>Discord Programming Language</b></h2>

------


<p align="center">Just an easier way to make a discord bot.</p>

<h2 align="center">Runover</h2>

### What is the best way to use DPL?

The best way to use DPL is to use nodejs and put `Compile.js` in the root of your project.

### Why not use the installer?

The installer is a bit of a pain to use and it's not really necessary. It's kind of broken when using it anywhere but in `C:\Users\YourUsername`

### Where does it put the compiled file?
The file will be put in the same directory as the `Compile.js` file and/or the location of the current directory when using command prompt.

### Does this work on MacOS/Linux?
No, it doesn't work on MacOS/Linux. Working on it, but still fixing issues with DPL.

<h2 align="center">How to use DPL</h2>

## Compile

```cmd
node Compile.js [file]
```

This is if you don't use the installer.

```cmd
dpl [file]
```

This is using the installer.

If you want to use the debugger, you can use the `debug` command.

Ex: `dpl [file] -debug` or `node Compile.js [file] -debug`

<h2 align="center">DPL Functions</h2>

------

## Settings

```js
settings = default;
```

Default settings are the best for overall use, and there are no other options right now.

------

## Token

```js
token = YourToken;
```

This is the token you get from the [Discord Developer Portal](https://discordapp.com/developers/applications/me). You can not put quotation marks around it.

------

## Activity

```js
activity = playing minecraft;
```

Activity is the activity you want the bot to show up as. In this example, `playing` is the type, which has to be `playing`, `streaming`, `listening`, or `watching`. `minecraft` is the name of the activity. Once again, you can not put quotation marks around anything in activity.

This is how it will show up in the bot's status:  <img src="https://github.com/ThatError404/DPL/blob/master/DPL-ActivityExample.png?raw=true" width="100">

------

## Ready

```js
ready;
```

This is the code that makes the bot connect to discord. This is neccecary for activity and running the bot.

------
