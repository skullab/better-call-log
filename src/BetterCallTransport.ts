import * as fs from "fs";

interface RowStruct {
    index: any;
    key: string;
    value: any;
    length: number;
}
interface ColStruct {
    name: string;
    width: number;
}
interface TableStruct {
    columns: any[];
    values: RowStruct[];
    out: string;
}
export class BetterCallTransport {

    private filename: string;
    private options: fs.WriteFileOptions;
    private throwable: boolean;

    constructor(filename: string, options?: fs.WriteFileOptions, throwable?: boolean) {
        this.filename = filename;
        this.options = options ?? { flag: "a+" };
        this.throwable = throwable ?? false;
    }

    protected writeToFile(content: string): void {
        fs.writeFile(this.filename, content, this.options, (err) => {
            if (err && this.throwable) throw err;
        });
    }

    public outRaw(...args:any[]){
        let content = '\t';
        for (let i = 0; i < args.length; i++) {
            content += JSON.stringify(args[i]) + ' ';
        }
        content += '\r';
        this.writeToFile(content);
    }

    public out(tag: string, ...args: any[]): void {
        let content = tag + '\n↳\t';
        for (let i = 0; i < args.length; i++) {
            content += JSON.stringify(args[i]) + ' ';
        }
        content += '\r';
        this.writeToFile(content);
    }

    private isArray(d: any): boolean {
        return Array.isArray(d);
    }
    private isObject(d: any): boolean {
        return (!Array.isArray(d) && d instanceof Object);
    }
    private isIterable(d: any): boolean {
        return this.isArray(d) || this.isObject(d);
    }


    private iterateTable(data: any, table: TableStruct, index?: number) {
        for (let [key, value] of Object.entries(data)) {
            if (this.isIterable(value)) {
                this.iterateTable(value, table, index);
            } else {
                table.values.push({ index: index, key: key, value: value, length: String(value).length });
            }
        }
    }

    public table(data: object | any[], columns?: any[]): void {

        const leftUpCorner = '┌';
        const rightUpCorner = '┐';
        const leftDownCorner = '└';
        const righttDownCorner = '┘';
        const horizontalRule = '─';
        const crossRule = '┼';
        const crossDown = '┬';
        const crossUp = '┴';
        const crossVerticalLeft = '├';
        const crossVerticalRight = '┤';
        const verticalRule = '│';

        let table: TableStruct = {
            columns: [],
            values: [],
            out: '',
        };

        let index = 0;
        for (let [key, value] of Object.entries(data)) {
            if (this.isIterable(value)) {
                this.iterateTable(value, table, index);
            } else {
                table.values.push({ index: this.isObject(data) ? key : index, key: key, value: value, length: String(value).length })
            }
            index++;
        }
        
        let out = '\t';
        let rows = [];
        let cols: ColStruct[] = [];

        if (columns) {
            table.columns = columns;
            for(let i in table.columns){
                cols.push({name:table.columns[i],width:String(table.columns[i]).length});
            }
        }

        for (let i in table.values) {
            let row = table.values[i];
            if (!Array.isArray(rows[row.index])) {
                rows[row.index] = [];
            }
            rows[row.index].push(row);
            if (table.columns.indexOf(row.key) === -1 && row.index !== parseInt(row.key)) {
                if (!columns) {
                    table.columns.push(row.key);
                    cols.push({ name: row.key, width: row.length });
                }
            } else if (table.columns.indexOf('Values') === -1 && row.index === parseInt(row.key)) {
                if (!columns) {
                    table.columns.push('Values');
                    cols.push({ name: 'Values', width: row.length });
                }
            }
            for (let x in cols) {
                let col = cols[x];
                if (row.key == col.name) {
                    if (col.width < row.length) {
                        col.width = row.length;
                    }
                }

            }
        }

        let c_values;
        for (let c = 0; c < cols.length; c++) {
            let col = cols[c];
            if (!isNaN(parseInt(col.name))) {
                let r = cols.splice(c, 1);
                cols.splice(parseInt(col.name), 0, r[0]);
            }
        }
        for (let c = 0; c < cols.length; c++) {
            let col = cols[c];
            if (col.name == 'Values') {
                c_values = cols.splice(c, 1);
            }
        }
        cols.splice(0, 0, { name: '(index)', width: '(index)'.length });
        if (c_values) {
            cols.push(c_values[0]);
        }
        if (this.isObject(data)) {
            cols.splice(1, cols.length, { name: 'Values', width: 'Values'.length });
        }
        out += leftUpCorner;
        for (let c in cols) {
            let col = cols[c];
            let width = Math.max(col.name.length, col.width) + 2;
            for (let s = 0; s < width; s++)out += horizontalRule;
            out += parseInt(c) < cols.length - 1 ? crossDown : rightUpCorner;
        }

        out += '\n\t';

        out += verticalRule;
        for (let c in cols) {
            let col = cols[c];
            let width = Math.max(col.name.length, col.width) + 2;
            let space = (width - col.name.length) / 2;
            let _s= (width - col.name.length) % 2;
            for (let s = 0; s < space; s++)out += ' ';
            out += col.name;
            for (let s = 0; s < space - _s; s++)out += ' ';
            out += verticalRule;
        }

        out += '\n\t';

        out += crossVerticalLeft;
        for (let c in cols) {
            let col = cols[c];
            let width = Math.max(col.name.length, col.width) + 2;
            for (let s = 0; s < width; s++)out += horizontalRule;
            out += parseInt(c) < cols.length - 1 ? crossRule : crossVerticalRight;
        }

        out += '\n\t';

        for (let r in rows) {
            let row = rows[r];
            let data = {};
            for (let i in row) {
                data[row[i].key] = row[i].value;
            }

        }

        for (let r in rows) {
            out += verticalRule;
            let row = rows[r];
            for (let c in cols) {
                let col = cols[c];
                let width = Math.max(col.name.length, col.width) + 2;
                let cell_printed = false;
                if (col.name == '(index)') {
                    let space = (width - String(row[0].index).length) / 2;
                    let _s = (width - String(row[0].index).length) % 2;
                    for (let s = 0; s < space; s++)out += ' ';
                    out += row[0].index;
                    for (let s = 0; s < space - _s; s++)out += ' ';
                    out += verticalRule;
                    cell_printed = true;
                }
                for (let i in row) {
                    let line = row[i];
                    if ((col.name == line.key && line.index != line.key) || (col.name == 'Values' && line.index == line.key)) {
                        let space = (width - line.length) / 2;
                        let _s = (width - line.length) % 2;
                        for (let s = 0; s < space; s++)out += ' ';
                        out += line.value;

                        for (let s = 0; s < space - _s; s++)out += ' ';
                        out += verticalRule;
                        cell_printed = true;
                    }
                }
                if (!cell_printed) {
                    for (let s = 0; s < width; s++)out += ' ';
                    out += verticalRule;
                }
            }
            out += '\n\t';
        }
        
        out += leftDownCorner;
        for (let c in cols) {
            let col = cols[c];
            let width = Math.max(col.name.length, col.width) + 2;
            for (let s = 0; s < width; s++)out += horizontalRule;
            out += parseInt(c) < cols.length - 1 ? crossUp : righttDownCorner;
        }

        this.writeToFile(out+'\n');
    }
}