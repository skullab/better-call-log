import { BetterCallInterface } from "./BetterCallInterface";
import { BetterCallLevel } from "./BetterCallLevel";
import { BetterCallOptions } from "./BetterCallOptions";

export class BetterCall implements BetterCallInterface{

    public static LEVEL_OFF:number      = 0x00 ;
    public static LEVEL_INFO:number     = 0x10 ;
    public static LEVEL_LOG:number      = 0x20 ;
    public static LEVEL_DEBUG:number    = 0x30 ;
    public static LEVEL_WARNING:number  = 0x40 ;
    public static LEVEL_ERROR:number    = 0x50 ;
    

    public options:BetterCallOptions ;
    public name:string;

    protected static instance:BetterCall;

    constructor(name?:string,options?:BetterCallOptions){
        this.name = name ?? 'Better Call LOG';
        this.options = options ?? new BetterCallOptions();
    }

    public static level(level?: BetterCallLevel):any{
        return BetterCall.getInstance().level(level);
    }

    public level(level?: BetterCallLevel):any{
        if(level != null){
            this.options.level = level ;
        }
        return this.options.level ;
    }

    public static getInstance():BetterCall{
        if(!BetterCall.instance){
            BetterCall.instance = new BetterCall();
        }
        return BetterCall.instance ;
    }

    public static isOff():boolean{
        return BetterCall.getInstance().isOff();
    }
    isOff():boolean{
        return !(this.level() | BetterCallLevel.OFF) ;
    }

    public static assert(...args: any[]){
        return BetterCall.getInstance().assert(...args);
    }
    assert(...args: any[]) {
        if(this.isOff())return;
        let assertion = args[0];
        if(!assertion || !this.options.ignoreAssert){
            this.fire('group','ASSERT');
        }
        if(assertion && !this.options.ignoreAssert){
            console.info('ASSERTION ',...args);
        }
        console.assert(...args);
        if(!assertion || !this.options.ignoreAssert){
            this.groupEnd();
        }
        
    }

    public static clear(){
        BetterCall.getInstance().clear();
    }
    clear() {
        if(this.isOff())return;
        console.clear();
    }

    public static count(label?: string){
        return BetterCall.getInstance().count(label);
    }
    count(label?: string) {
        if(this.isOff())return;
        label = label ?? this.name ;
        console.count(label);
    }

    public static countReset(label?: string){
        return BetterCall.getInstance().countReset(label);
    }
    countReset(label?: string) {
        if(this.isOff())return;
        label = label ?? this.name ;
        console.countReset(label);
    }

    public static debug(...args: any[]){
        return BetterCall.getInstance().debug(...args);
    }
    debug(...args: any[]) {
        if(this.level() & BetterCallLevel.DEBUG)this.fire('debug',...args);
    }

    public static dir(obj: object){
        return BetterCall.getInstance().dir(obj);
    }
    dir(obj: object) {
        if(this.isOff())return;
        console.dir(obj);
    }

    public static dirxml(obj: object){
        return BetterCall.getInstance().dirxml(obj);
    }
    dirxml(obj: object) {
        if(this.isOff())return;
        console.dirxml(obj);
    }

    public static error(...args){
        return BetterCall.getInstance().error(...args);
    }
    error(...args: any[]) {
        if(this.level() & BetterCallLevel.ERROR)this.fire('error',...args);
    }

    public static group(label?: string){
        return BetterCall.getInstance().group(label);
    }
    group(label?: string) {
        if(this.isOff())return;
        label = label ?? this.name;
        console.group(label);
    }

    public static groupCollapsed(label?: string){
        return BetterCall.getInstance().groupCollapsed(label);
    }
    groupCollapsed(label?: string) {
        if(this.isOff())return;
        label = label ?? this.name ;
        console.groupCollapsed(label);
    }

    public static groupEnd(n?: number){
        return BetterCall.getInstance().groupEnd(n);
    }
    groupEnd(n?: number) {
        if(this.isOff())return;
        n = n ?? 1 ;
        for(let i = 0 ; i < n ; i++){
            console.groupEnd();
        }
    }

    public static info(...args: any[]){
        return BetterCall.getInstance().info(...args);
    }
    info(...args: any[]) {
        if(this.level() & BetterCallLevel.INFO)this.fire('info',...args);
    }

    public static log(...args: any[]){
        return BetterCall.getInstance().log(...args);
    }
    log(...args: any[]) {
        if(this.level() & BetterCallLevel.LOG)this.fire('log',...args);
    }

    public static table(data: object | any[]){
        return BetterCall.getInstance().table(data);
    }
    table(data: object | any[],name?: string,columns?:any[]) {
        if(this.isOff())return;
        this.fire('group','TABLE', name ?? this.name);
        console.table(data,columns);
        this.groupEnd();
    }

    public static time(label: string){
        return BetterCall.getInstance().time(label);
    }
    time(label: string) {
        if(this.isOff())return;
        console.time(label);
    }

    public static timeEnd(label: string){
        return BetterCall.getInstance().timeEnd(label);
    }
    timeEnd(label: string) {
        if(this.isOff())return;
        this.fire('group','TIME END');
        console.timeEnd(label);
        this.groupEnd();
    }

    public static timeLog(label: string){
        return BetterCall.getInstance().timeLog(label);
    }
    timeLog(label: string) {
        if(this.isOff())return;
        this.fire('group','TIME LOG');
        console.timeLog(label);
        this.groupEnd();
    }

    public static timeStamp(label?: string){
        return BetterCall.getInstance().timeStamp(label);
    }
    timeStamp(label?: string):string {
        let options:Intl.DateTimeFormatOptions = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
        };
        // TODO use luxon
        let locale = typeof navigator !== 'undefined' ? navigator.language : 'en-EN' ;
        return label ?? '' + ' ' +Intl.DateTimeFormat(locale,options).format(new Date())
    }

    public static trace(...args: any[]){
        return BetterCall.getInstance().trace(...args);
    }
    trace(...args: any[]) {
        if(this.isOff())return;
        this.fire('trace',...args);
    }

    public static warn(...args: any[]){
        return BetterCall.getInstance().warn(...args);
    }
    warn(...args: any[]) {
        if(this.level() & BetterCallLevel.WARNING)this.fire('warn',...args);
    }

    protected fire(tag:string,...args: any[]){
        let p = this.options.style.package(tag);
        let tagSpaces = ''; 
        let nameSpaces = '';
        for(let i = 0 ; i < 10 - p.tag.length ; i++)tagSpaces += ' ';
        let name = this.name.length > 20 ? this.name.substring(0,20) + '...' : this.name ;
        for(let i = 0 ; i < 25 - name.length ; i++)nameSpaces += ' ';

        let content = [] ;
        content[p.order['tag']] = p.tag + tagSpaces + '➤ ' + name + nameSpaces + (this.options.showTimestamp ? '➤' + this.timeStamp() : '');
        content[p.order['style']] = p.style ;
        content.push('\n↳');

        if(this.options.compactMode){
            content.pop();
            this.options.compactCollapsed ? console.groupCollapsed.apply(this,content) : console.group.apply(this,content) ;
        }

        console[tag].apply(this,(this.options.compactMode ? args : content.concat(args)));
        if(this.options.compactMode){
            console.groupEnd.call(this);
        }
    }
}