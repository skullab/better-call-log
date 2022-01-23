import { BetterCallLevel } from "./BetterCallLevel";
import { BetterCallStyle } from "./BetterCallStyle";
import { BetterCallStyleANSI } from "./BetterCallStyleANSI";
import { BetterCallStyleCSS } from "./BetterCallStyleCSS";
import { BetterCallTransport } from "./BetterCallTransport";

export class BetterCallOptions {
    public level:BetterCallLevel = BetterCallLevel.ALL ;
    public ignoreAssert:boolean = false;
    public style:BetterCallStyle = typeof window !== 'undefined' ? new BetterCallStyleCSS() : new BetterCallStyleANSI;
    public showTimestamp:boolean = true;
    public dateTimeFormat:Intl.DateTimeFormatOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
    };
    public locale:string = "en-EN";
    public timeZone:string = "Europe/London";
    public useISOTime:boolean = true ;
    public compactMode:boolean = false;
    public compactCollapsed:boolean = false;
    public fileTransport:BetterCallTransport;
}