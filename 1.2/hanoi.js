let hanoiByRecursion = function(num, from, depend, to) {
    if(from === undefined){from = 'A'}
    if(depend === undefined){depend = 'B'}
    if(to === undefined){to = 'C'}
    if(num === 1) {
        console.log(`${ num } : ${ from } => ${ to }`);
    }else {
        hanoiByRecursion(num - 1, from, to , depend);
        console.log(`${ num } : ${ from } => ${ to }`);
        hanoiByRecursion(num - 1, depend, from, to);
    }
}

let hanoiByLoop = function(num, from, depend, to, idx) {
    if(from === undefined){from = 'A'}
    if(depend === undefined){depend = 'B'}
    if(to === undefined){to = 'C'}
    let stack = [];
    stack.push({
        num: num,
        from: from,
        depend: depend,
        to: to,
        isIn: true,
    });
    while(!!stack.length) {
        let args = stack[stack.length - 1];
        let num = args.num;
        let from = args.from;
        let depend = args.depend;
        let to = args.to;
        let isIn = args.isIn;
        if(isIn){
            if(num === 1){
                console.log(`${ num } : ${ from } => ${ to }`);
                stack.pop();
                stack[stack.length - 1].isIn = false;
            }else{
                stack[stack.length - 1].idx = 0;
                stack.push({
                    num : num - 1, 
                    from: from, 
                    depend: to, 
                    to: depend,
                    isIn : true
                });
            }
        }else{
            if(args.idx === 0){
                console.log(`${ num } : ${ from } => ${ to }`);
                stack[stack.length - 1].idx = 1;
                stack.push({
                    num : num - 1, 
                    from: depend, 
                    depend: from, 
                    to: to,
                    isIn : true,
                });
            }else{
                stack.pop();
                if(!!stack.length){
                    stack[stack.length - 1].isIn = false;
                }
            }
        }
    }
}

let main = function(){
    console.log('num : 3');
    hanoiByRecursion(3);
    hanoiByLoop(3);
}

main();