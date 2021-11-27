import { BetterCallStyle } from "./BetterCallStyle";
import { BetterCallStylePackage } from "./BetterCallStylePackage";
import { Color } from "./Color";

export class BetterCallStyleANSI extends BetterCallStyle{

    constructor(){
        super();
        this.style.base = [];
        this.style.info = [
            Color.BgBlue,
            Color.FgWhite,
        ];
        this.style.log = [
            Color.BgBlack,
            Color.FgWhite,
        ];
        this.style.debug = [
            Color.BgCyan,
            Color.FgBlack,
        ];
        this.style.warn = [
            Color.BgYellow,
            Color.FgBlack,
        ];
        this.style.error = [
            Color.BgRed,
            Color.FgBlack,
        ];
        this.style.trace = [
            Color.BgMagenta,
            Color.FgWhite,
        ];
        this.style.table = [
            Color.BgMagenta,
            Color.FgWhite,
        ];
        this.style.group = [
            Color.BgMagenta,
            Color.FgWhite,
        ];
        this.style.assert = [
            Color.BgMagenta,
            Color.FgWhite,
        ];
    }

    public toString(tag: string):string{
        return (this.style.base.join('') + (this.style[tag] ? this.style[tag].join('') : '') + '%s' + Color.Reset) ;
    }

    public package(tag: string): BetterCallStylePackage {
        return {style:this.toString(tag),tag:tag.toUpperCase(),order:{style:0,tag:1}} ;
    }

}