import { BetterCallStyle } from "./BetterCallStyle";
import { BetterCallStylePackage } from "./BetterCallStylePackage";

export class BetterCallStyleCSS extends BetterCallStyle{
    
    constructor(){
        super();
        this.style.base = [
            "padding: 2px 4px",
            "border-radius: 2px"
        ];
        this.style.debug = [
            "background-color: #5EEBC2",
            "color: #000000"
        ];
        this.style.error = [
            "background-color: #F54E47",
            "color: #000000"
        ];
        this.style.info = [
            "background-color: #30A2F5",
            "color: #D0FFFF"
        ];
        this.style.log = [
            "background-color: #000000",
            "color: #FFFFFF"
        ];
        this.style.warn = [
            "background-color: #EBBA3E",
            "color: #000000"
        ];
        this.style.trace = [
            "background-color: #69187D",
            "color: #FFFFFF"
        ];
        this.style.table = [
            "background-color: #69187D",
            "color: #FFFFFF"
        ];
        this.style.group = [
            "background-color: #69187D",
            "color: #FFFFFF"
        ];
        this.style.assert = [
            "background-color: #69187D",
            "color: #FFFFFF"
        ];
    }

    public toString(tag: string):string{
        return (this.style.base.join(';') + ';') + (this.style[tag] ? this.style[tag].join(';') + ';' : '') ;
    }

    public package(tag:string): BetterCallStylePackage {
        return {style:this.toString(tag),tag:'%c'+tag.toUpperCase(),order:{tag:0,style:1}} ;
    }

}