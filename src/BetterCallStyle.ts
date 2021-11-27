import { BetterCallStyleObject } from "./BetterCallStyleObject";
import { BetterCallStylePackage } from "./BetterCallStylePackage";

export abstract class BetterCallStyle {

    protected style:BetterCallStyleObject;

    constructor(style?:BetterCallStyleObject){
        this.style = style ?? new BetterCallStyleObject();
    }

    public abstract package(tag:string):BetterCallStylePackage;
}