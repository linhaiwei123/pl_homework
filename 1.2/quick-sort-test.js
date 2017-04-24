let quickSortByRecursion = function(array,left,right) {
    if(left === undefined){left = 0;}
    if(right === undefined){right = array.length - 1}
    if(left < right) {
        let low = partition(array, left, right);
        quickSortByRecursion(array, left, low - 1);
        quickSortByRecursion(array, low + 1, right);
    }
}

let quickSortByLoop = function(array,left,right) {
    let stack = [];
    if(left < right) {
        stack.push(right);
        stack.push(left);
        while(!stack.length){
            let left = stack.pop();
            let right = stack.pop();
            let low = partition(array, left, right);
            if(left < low - 1){
                stack.push(low - 1);
                stack.push(low);
            }
            if(right > low + 1){
                stack.push(right);
                stack.push(low + 1);
            }
        }
    }
}

let partition = function(array, left, right){
        let key = array[left];
        let low = left;
        let high = right;
        while(low < high) {
            while(low < high && array[high] > key) {
                high --;
            }
            array[low] = array[high];
            while(low < high && array[low] < key) {
                low ++;
            }
            array[high] = array[low];
        }
        array[low] = key;
        return low;
}



let main = function(){
    let array = [1,2,6666,2333,5,444,7,99999,9,10];
    let startTimeStamp = null;
    let endTimeStamp =  null;
    console.log('loop test :');
    startTimeStamp = Date.now();
    quickSortByLoop(array);
    endTimeStamp = Date.now();
    console.log(array);
    console.log('time:' ,(endTimeStamp - startTimeStamp),' (ms)');
    console.log('recursion test :');
    startTimeStamp = Date.now();
    quickSortByLoop(array);
    endTimeStamp = Date.now();
    console.log(array);
    console.log('time:' ,(endTimeStamp - startTimeStamp),' (ms)');
}

main();