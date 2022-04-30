class flagObj
{
    flagObj(name, func, primaryprefix, secondaryprefix,  description) 
    {
        if (!(name && call && primaryprefix))
            throw new TypeError("Invalid args for flag creation!")

        this.name = name
        this.ppf = primaryprefix
        this.spf = secondaryprefix
        this.func = func
        this.des = description
    }
}

class commandObj
{
    commandObj(name, func, primaryname, secondaryname, args) {
        if (!(name && func && primaryname))
            throw new TypeError("Invalid args for command creation!")

        this.name = name
        this.func = func
        this.pname = primaryname
        this.sname = secondaryname
        this.args = args || 0

        this.flags = []
        this.prefixes = {}
    }

    prefixError(flag, flagtype) {
        console.warn("WARNING: Prefix collision in command \""+this.name+"\"\n"+
            "with prefix \""+flag[flagtype]+"\" with commands +\""+flag.name+"\" and \""+this.prefixes[flag[flagtype]].name+"\"")
    }

    addFlag(flag)
    {
        this.flags.push(flag)

        if (this.prefixes[flag.ppf])
            prefixError(flag, "ppf")

        if (this.prefixes[flag.spf])
            prefixError(flag, "spf")

        this.prefixes[flag.ppf] = flag
        this.prefixes[flag.spf] = flag
    }
}

class commandLineObj
{
    commandLineObj()
    {
        commands = []
        calls = {}
    }

    commandPrefixError(command, prefixtype)
    {
        console.warn("WARNING: Prefix collision in command \""+this.name+"\"\n"+
                "with prefix \""+command[prefixtype]+"\" with commands +\""+command.name
                +"\" and \""+this.calls[command[prefixtype]].name+"\"")
    }

    addCommand(command)
    {
        this.commands.push(command)

        if (this.calls[command.pname])
            commandPrefixError(command, "pname")

        if (this.calls[command.sname])
            commandPrefixError(command, "sname")

        this.calls[command.pname] = command
        this.calls[command.sname] = command

        return this
    }
}

function createFlagError()
{

}

function rawFlags(command, args)
{
    var err
    for (var i = 0; i < args.length; i++)
    {
        const prefix = args[i]
        const flag = command.calls[prefix]

        if (flag == undefined)
        {
            error
            break
        }

        const flagargs = []
        for (var k = 0; k < flag.args; k++)
        {
            flagargs.push(args[i+k])
        }
        i += flag.args

        flag.func(flagargs)
    }

    return err == undefined, err
}

function handleFlags(commandLine, str, yell)
{
    const args = str.split(" ")
    const command = args[0]
    args.shift()

    const cmd = commandLine.calls[command]
    if (cmd)
    {
        rawFlags(cmd, args)
    }
}

exports.handleFlags = handleFlags
exports.rawFlags = rawFlags

exports.flagObj = flagObj
exports.commandObj = commandObj
exports.commandLineObj = commandLineObj