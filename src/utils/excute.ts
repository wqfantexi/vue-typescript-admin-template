import * as child_process from 'child_process'
import uuid from 'uuid';
import fs from 'fs';

//参数
export class ParamItem {
    required: boolean = false;
    name: string = ''; //参数名称
    prefix: string = ''; //参数前导
    param: string = ' '; //参数

    toString(): string {
        let ret = '';
        if (this.prefix.length > 0) {
            ret += this.prefix;
        }

        ret += ' ' + this.param;

        return ret;
    }

    loadFromJson(obj:any){
        this.required = obj.required;
        this.name = obj.name;
        this.prefix = obj.prefix;
        this.param = obj.param;
    }
}

//任务模板
export class ExcuteTemplate {
    key:string;//guid,唯一标识
    name: string;
    scriptpath: string;
    Param: Array<ParamItem>;
    constructor(_name: string = '', _script: string = '') {
        this.key = uuid.v1();
        this.name = _name;
        this.scriptpath = _script;
        this.Param = new Array<ParamItem>();
    }

    //执行脚本
    runScript(caller: any, callback: Function) {
        let script = this.scriptpath;
        this.Param.forEach((item) => {
            script.concat(' ' + item.toString());
        });
        console.log(script);

        const thread = child_process.spawn(script, );

        thread.stdout.on('data', (data)=>{
            callback(caller, data);
        });
        thread.stderr.on('data', (data)=>{
            callback(caller, data);
        });

        thread.on('close', (code) => {
            callback(caller, `child process exited with code ${code}`);
          });
    }

    loadFromJson(obj:any){
        this.key = obj.key;
        this.name = obj.name;
        this.scriptpath = obj.scriptpath;

        obj.Param.forEach((element:any) => {
            let p = new ParamItem();
            p.loadFromJson(element);
            this.Param.push(p);
        });
    }
}
//模板管理
export class ExcuteTemplateMgr {
    ArrTemplate: Array<ExcuteTemplate>;//任务模板
    ArrScript:Array<ExcuteTemplate>;//任务脚本
    constructor() {
        this.ArrTemplate = [];
        this.ArrScript = [];
    }

    appendTemplate(tmp:ExcuteTemplate){
        this.ArrTemplate.push(tmp);
    }

    appendScript(tmp:ExcuteTemplate){
        this.ArrScript.push(tmp);
    }

    loadFromPath(jsonPath:string){
        const fileContent = fs.readFileSync(jsonPath, 'utf8');
        const obj = JSON.parse(fileContent);
        obj['ArrTemplate'].forEach((item:any)=>{
            let tmp = new ExcuteTemplate();
            tmp.loadFromJson(item);
            this.appendTemplate(tmp);
        });
        obj['ArrScript'].forEach((item:any)=>{
            let tmp = new ExcuteTemplate();
            tmp.loadFromJson(item);
            this.appendScript(tmp);
        });
    }
    saveToPath(jsonPath:string){
        const fileContent = JSON.stringify(this, null, 4);
        fs.writeFileSync(jsonPath, fileContent);
    }

    runScript(caller: any, callback: Function){
        this.ArrScript.forEach((item)=>{
            item.runScript(caller, callback);
        });
    }
}