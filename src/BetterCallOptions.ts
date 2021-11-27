import { BetterCallLevel } from "./BetterCallLevel";
import { BetterCallStyle } from "./BetterCallStyle";
import { BetterCallStyleANSI } from "./BetterCallStyleANSI";
import { BetterCallStyleCSS } from "./BetterCallStyleCSS";

export class BetterCallOptions {
    public level:BetterCallLevel = BetterCallLevel.ALL ;
    public ignoreAssert:boolean = false;
    public style:BetterCallStyle = typeof window !== 'undefined' ? new BetterCallStyleCSS() : new BetterCallStyleANSI;
    public showTimestamp:boolean = true;
    public compactMode:boolean = false;
    public compactCollapsed:boolean = false;
}