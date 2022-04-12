class flagObj
{
    flagObj(name, call, primaryprefix, secondaryprefix,  description) 
    {
        if (!(name && call && primaryprefix))
            throw new TypeError("Invalid args for flag creation!")

        this.name = name
        this.ppf = primaryprefix
        this.spf = secondaryprefix
        this.call = call
        this.des = description
    }
}

class commandObj
{
    commandObj(name, call, primaryname, secondaryname) {
        if (!(name && call && primaryname))
            throw new TypeError("Invalid args for command creation!")

        this.name = name
        this.call = call
        this.pname = primaryname
        this.sname = secondaryname

        this.flags = []
        this.prefixes = {}
    }

    prefixError(flag1, flag2, flagtype) {
        
    }

    addFlag(flag)
    {
        this.flags.push(flag)

        if (this.prefixes[flag.ppf])
            throw new TypeError("Prefix collision in command \""+this.name+"\"\n"+
            "with prefix \""+flag.ppf+"\" with commands +\""+flag.name+"\" and \""+this.prefixes[flag.ppf].name+"\"")
        this.prefixes[flag.ppf] = flag
        this.prefixes[flag.spf] = flag
    }
}

class commandLineObj
{
    commandLineObj()
    {
        commands = {}
    }
}

function HandlerFlags(command, str, yell)
{

}