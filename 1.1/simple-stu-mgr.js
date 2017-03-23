let fileObj = {
    data: [],
    length: null,
};
fileObj.length = fileObj.data.length;

process.stdin.setEncoding('utf8')
process.stdin.on('readable', ()=>{
    let cmdString = process.stdin.read();
    if(cmdString !== null){
        //cmd parser
        cmdString = cmdString.replace("\r\n","");
        let cmdArray = cmdString.split(" ");
        //console.log(cmdArray);
        let cmd = cmdArray[0];
        switch(cmd){
            case 'load': loadHandler(cmdArray);break;
            case 'save': saveHandler(cmdArray);break;
            case 'select': selectHandler(cmdArray);break;
            case 'delete': deleteHandler(cmdArray);break;
            case 'update': updateHandler(cmdArray);break;
            case 'insert': insertHandler(cmdArray); break;
        }
    }
});

let fs = require('fs');
let loadHandler = function(cmdArray){
    //console.log("loadHandler");
    let fileName = cmdArray[1];
    if(!fileName){
        console.log('give me the file name');
    }else{
        let file = fs.readFileSync(fileName,'utf-8');
        fileObj = JSON.parse(file);
        console.log('system: load success');
    }
};
let saveHandler = function(cmdArray){
    //console.log("saveHandler");
    let fileString = JSON.stringify(fileObj).replace(/},{/g,'},\n{').replace('null,','').replace(',null','');
    fs.writeFileSync("simple-stu-data.json",fileString,'utf-8');
    console.log('system: save success');
};
let selectHandler = function(cmdArray){
    //console.log("selectHandler");
    let filterData = [];
    let cmd = cmdArray.shift();
    let argArray = cmdArray;
    let orderCmd = 'desc';
    let orderKey = 'id';
    for(let i = 0; i < argArray.length; i++){
        let argSet = argArray[i].split("=");
        let argCmd = argSet[0];
        if(argCmd == 'desc' || argCmd == 'asc'){
            orderCmd = argCmd;
            orderKey = argSet[1];
        }
        // argArray.splice(i,1);
        // console.log(argArray);
        break;
    }
    fileObj.data.forEach((value,index,array)=>{
        let isPass = true;
        for(let arg of argArray){
            let argSet = arg.match(/([a-zA-z0-9]+)(<>|>=|<=|=|>|<)([a-zA-z0-9]+)/);
            //console.log(argSet);
            //console.log(value);
            if(argSet && (argSet[1] == 'desc' || argSet[1] == 'asc')){continue;}
            if(argSet[2] == '='){argSet[2] = '=='}
            if(argSet[2] == '<>'){argSet[2] = '!='}

            let conditionString = 'value.' + argSet[1] + argSet[2] + "'" + argSet[3] + "'";
            //console.log(conditionString);
            if(eval(conditionString)){
            //if(){
                continue;
            }else{
                isPass = false;
                break;
            }
        };
        if(isPass){
            filterData.push(value);
        }
    });
    filterData.sort((a,b)=>{
        if(orderCmd == 'desc'){
            return a[orderKey] - b[orderKey];
        }else{
            return b[orderKey] - a[orderKey];
        }
    })
    console.log(filterData);
};
let deleteHandler = function(cmdArray){
    //console.log("deleteHandler");
    let filterData = [];
    let cmd = cmdArray.shift();
    let argArray = cmdArray;
    fileObj.data.forEach((value,index,array)=>{
        let isPass = true;
        for(let arg of argArray){
            let argSet = arg.match(/([a-zA-z0-9]+)(<>|>=|<=|=|>|<)([a-zA-z0-9]+)/);
            //console.log(argSet);
            //console.log(value);
            if(argSet[2] == '='){argSet[2] = '=='}
            if(argSet[2] == '<>'){argSet[2] = '!='}

            let conditionString = 'value.' + argSet[1] + argSet[2] + "'" + argSet[3] + "'";
            //console.log(conditionString);
            //console.log(conditionString);
            //console.log(eval(conditionString));
            if(eval(conditionString)){
            //if(){
                continue;
            }else{
                isPass = false;
                break;
            }
        };
        if(isPass){
            filterData.push(value);
        }
    });
    //console.log(filterData);
    for(let item of filterData){
        delete fileObj.data[item.id];
    }
    console.log("system: delete success");

};
let updateHandler = function(cmdArray){
    //console.log("updateHandler");
    let filterData = [];
    let cmd = cmdArray.shift();
    let argArray = cmdArray;
    let newDataArray = [];
    let conditionArray = [];
    let i;
    
    for(i = 0; i < argArray.length; i++){
        let arg = argArray[i];
        console.log(arg);
        if(arg == 'where'){
            newDataArray = argArray.slice(0,i);
            //console.log(newDataArray);
            conditionArray = argArray.slice(i+1,argArray.length);
            //console.log(conditionArray);
            break;
        }
        //argArray.splice(i,1);
    }
    if(i == argArray.length){
        console.log('give me the where condition');
        return;
    }
    
    fileObj.data.forEach((value,index,array)=>{
        let isPass = true;
        for(let arg of conditionArray){
            let argSet = arg.match(/([a-zA-z0-9]+)(<>|>=|<=|=|>|<)([a-zA-z0-9]+)/);
            //console.log(argSet);
            //console.log(value);
            if(argSet[1] == 'desc' || argSet[1] == 'asc'){continue;}
            if(argSet[2] == '='){argSet[2] = '=='}
            if(argSet[2] == '<>'){argSet[2] = '!='}

            let conditionString = 'value.' + argSet[1] + argSet[2] + "'" + argSet[3] + "'";
            //console.log(conditionString);
            //console.log(conditionString);
            //console.log(eval(conditionString));
            if(eval(conditionString)){
            //if(){
                continue;
            }else{
                isPass = false;
                break;
            }
        };
        if(isPass){
            filterData.push(value);
            
        }
    });
    for(let item of filterData){
        for(let newData of newDataArray){
             let set = newData.split("=");
             if(set){
                let key = set[0];
                if(key == 'id'){continue;}
                let value = set[1];
                item[key] = value;
             }
        }
    }
    console.log("system: update success");
};
let insertHandler = function(cmdArray){
    //console.log("insertHandler");
    let dataBean = {};
    let cmd = cmdArray.shift();
    let argArray = cmdArray;
    //console.log(argArray);
    for(let arg of argArray){
        let set = arg.split("=");
        if(set){
            let key = set[0];
            let value = set[1];
            dataBean[key] = value;
        }
    }
    //console.log(dataBean);
    dataBean.id = fileObj.length;
    fileObj.length++;
    fileObj.data[dataBean.id] = dataBean;
    //console.log(fileObj);
    console.log('system: insert success');
};
