class flag
{
    flag(call, primaryprefix, secondaryprefix,  description) 
    {
        if (!(call && primaryprefix))
            throw new TypeError("Invalid args for flag creation!")

        this.ppf = primaryprefix
        this.spf = secondaryprefix
        this.call = call
        this.des = description
    }
}

class command
{
    command() {
        
    }
}

function HandlerFlags(command, str, yell)
{

}