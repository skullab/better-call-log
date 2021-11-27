import { DateTime } from "luxon";
export default class BetterCall {
    
    static LEVEL            = 0;

    static LEVEL_OFF        = -1;
    static LEVEL_INFO       = 0;
    static LEVEL_LOG        = 10 ;
    static LEVEL_DEBUG      = 20 ;
    static LEVEL_WARNING    = 30;
    static LEVEL_ERROR      = 40;

    constructor(name = "BetterCall" , level = 0, options = {}){
        this._name = name ;
        this._level = level;
        this._options = {
            timestamp: true,
            showName: true,
            ignoreAssert: false,
            collapsed:false,
            style: {
                base: [
                    "padding: 2px 4px",
                    "border-radius: 2px"
                ],
                info: [
                    "background-color: #30A2F5",
                    "color: #D0FFFF"
                ],
                log: [
                    "background-color: #000000",
                    "color: #FFFFFF"
                ],
                debug: [
                    "background-color: #5EEBC2",
                    "color: #000000"
                ],
                warning: [
                    "background-color: #EBBA3E",
                    "color: #000000"
                ],
                error: [
                    "background-color: #F54E47",
                    "color: #000000"
                ],
                assert: [
                    "background-color: #69187D",
                    "color: #FFFFFF"
                ],
                trace: [
                    "background-color: #69187D",
                    "color: #FFFFFF"
                ],
                table: [
                    "background-color: #69187D",
                    "color: #FFFFFF"
                ],
                breakpoint: [
                    "background-color: #F54E47",
                    "color: #FFFFFF"
                ],
            }
        }
        this.options(options);
    }

    level(level = null){
        if(level == null){
            return this._level
        }
        this._level = level ;
        return this;
    }

    timestamp(){
        return DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
    }

    options(options){
        this._options = Object.assign(this._options,options);
        return this;
    }

    payload(label){
        return "%c" + label + (this._options.showName ? ` ${this._name}` : "") + (this._options.timestamp ? " " + this.timestamp() : "");
    }

    getStyle(styleOption){
        let style = this._options.style.base.join(";") + ";";
        style += styleOption.join(";") + ";";
        return style ;
    }

    breakpoint(label = ""){
        console.log(this.payload(`🔴 ${label}`),this.getStyle(this._options.style.breakpoint));
        debugger;
        return this;
    }

    off(){
        this._level = BetterCall.LEVEL_OFF ;
    }

    offAll(){
        BetterCall.LEVEL = BetterCall.LEVEL_OFF ;
    }

    throw(message){
        this._groupOrCollapsed(this.payload("THROW"),this.getStyle(this._options.style.error));
        throw new Error(message);
        console.groupEnd();
    }
    // Wrapper
    assert(...args){
       return this.test(...args);
    }

    test(...args){
        if(BetterCall.LEVEL < 0 || this._level < 0 || this._options.ignoreAssert)return false;

        let label = "Assertion" ;
        let assertion = args[0];

        if(typeof args[0] === 'string' || args[0] instanceof String){
            label = args[0] ;
            assertion = args[1] ;
            args.shift();
        }

        console.group(this.payload("ASSERT"),this.getStyle(this._options.style.assert));
        console.info(label);
        if(assertion){
           console.info("response",assertion);
        }
        console.assert(...args);
        console.groupEnd();
        return assertion;
    }
    
    static clear(){
        console.clear();
    }

    count(label = "default"){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        if(this._options.showName){
            label = this._name + ":" + label ; 
        }
        console.count(label);
        return this;
    }

    countReset(label = "default"){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        if(this._options.showName){
            label = this._name + ":" + label ; 
        }
        console.countReset(label);
        return this;
    }

    debug(...args){
        if(BetterCall.LEVEL < 0 || this._level < 0 || this._level > BetterCall.LEVEL_DEBUG)return;
        console.group(this.payload("DEBUG"),this.getStyle(this._options.style.debug));
        console.debug(...args);
        console.groupEnd();
        return this;
    }

    dir(object){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        console.dir(object);
        return this;
    }

    dirxml(object){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        console.dirxml(object);
        return this;
    }

    error(...args){
        if(BetterCall.LEVEL < 0 || this._level < 0 || this._level > BetterCall.LEVEL_ERROR)return;
        this._groupOrCollapsed(this.payload("ERROR"),this.getStyle(this._options.style.error));
        console.error(...args);
        console.groupEnd();
        return this;
    }

    _groupOrCollapsed(...args){
        this._options.collapsed ? console.groupCollapsed(...args) : console.group(...args);
        return this;
    }

    group(label = "default"){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        if(this._options.showName){
            label = this._name + ":" + label ; 
        }
        console.group(label);
        return this;
    }
    
    groupCollapsed(label = "default"){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        if(this._options.showName){
            label = this._name + ":" + label ; 
        }
        console.groupCollapsed(label);
        return this;
    }

    groupEnd(n = 1){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        for(var i = 0 ; i < n ; i++)
            console.groupEnd();
        return this;
    }

    info(...args){
        if(BetterCall.LEVEL < 0 || this._level < 0 || this._level > BetterCall.LEVEL_INFO)return;
        this._groupOrCollapsed(this.payload("INFO"),this.getStyle(this._options.style.info));
        console.info(...args);
        console.groupEnd();
        return this;
    }

    log(...args){
        if(BetterCall.LEVEL < 0 || this._level < 0 || this._level > BetterCall.LEVEL_LOG)return;
        this._groupOrCollapsed(this.payload("LOG"),this.getStyle(this._options.style.log));
        console.log(...args);
        console.groupEnd();
        return this;
    }

    table(data,columns = null){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        console.info(this.payload("TABLE"),this.getStyle(this._options.style.table));
        console.table(data,columns);
        return this;
    }

    time(label = "default"){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        if(this._options.showName){
            label = this._name + ":" + label ; 
        }
        console.time(label);
        return this;
    }

    timeLog(label = "default"){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        if(this._options.showName){
            label = this._name + ":" + label ; 
        }
        console.timeLog(label);
        return this;
    }

    timeEnd(label = "default"){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        if(this._options.showName){
            label = this._name + ":" + label ; 
        }
        console.timeEnd(label);
        return this;
    }

    trace(...args){
        if(BetterCall.LEVEL < 0 || this._level < 0)return;
        console.info(this.payload("TRACE"),this.getStyle(this._options.style.trace));
        console.trace(...args);
        return this;
    }

    warn(...args){
        if(BetterCall.LEVEL < 0 || this._level < 0 || this._level > BetterCall.LEVEL_WARNING)return;
        this._groupOrCollapsed(this.payload("WARNING"),this.getStyle(this._options.style.warning));
        console.warn(...args);
        console.groupEnd();
        return this;
    }
}