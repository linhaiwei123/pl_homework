let reduce = function(arr,step,init){
    if(!!arr.length){
        let r = init !== undefined ? init : 0;
        
        for(let i = 0,l = arr.length; i < l; i++){
           r = step(r,arr[i]);
        }
        return r;
    }
    return (init !== undefined) ?init : null;
}

let map = function(arr,step){
    if(!!arr.length){
        let r = [];
        for(let i = 0,l = arr.length; i < l; i++){
            r[i] = step(arr[i]);
        }
        return r;
    }
    return arr.splice(0,arr.length);
}

let reduceTree = function(arr,step,init){
    if(!!arr.length){
        let r = init !== undefined ? init : 0;

        for(let i = 0,l = arr.length; i < l; i++){
            if(arr[i] instanceof Array){
                r = reduceTree(arr[i],step,r);
            }else{
                r = step(r,arr[i]);
            }
        }
        return r;
    }
    return (init !== undefined) ?init : null;;
}

let mapTree = function(arr,step){
    if(!!arr.length){
        let r = [];
        for(let i = 0,l = arr.length; i < l; i++){
            if(arr[i] instanceof Array){
                r[i] = mapTree(arr[i],step);
            }else{
                r[i] = step(arr[i]);
            }
        }
        return r;
    }
    return arr.splice(0,arr.length);
}


let sqrtSum = function(a,b){
    return a + b * b;
}

let isPositive = function(a,b){
    return a + (b > 0 ? 1 : 0);
}

let flateArr = function(a,b){
    for(let i = 0,l = b.length; i < l; i++) {
        if(b[i] instanceof Array){
            flateArr(a,b[i]);
        }else{
            a.push(b[i]);
        }
    }
    return a;
}

let treeNodeIncrement = function(a){
    return a + 1;
}

let treeNodeAdd = function(a,b){
    return a + b;
}

let main = function(){
    let arr = [];
    let result = -1;
    arr = [1,2,3,4];
    result = reduce(arr,sqrtSum);
    console.log(result);

    arr = [-1,1,0,-2,5];
    result = reduce(arr,isPositive);
    console.log(result);

    arr = [[1,2],[3,4,5],[6]];
    result = reduce(arr,flateArr,[]);
    console.log(result);


    arr = [[[1,2,3]]];
    result = mapTree(arr,treeNodeIncrement);
    console.log(result);

    arr = [[[1,2,3]]];
    result = reduceTree(arr,treeNodeAdd);
    console.log(result);
}

main();