//1

function firstRepeatingElement(arr){
    loop = [];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] in loop){
            return arr[i];
        }else{
            loop.push(arr[i]);
        }
    }
    return null;
}

console.log(firstRepeatingElement([1, 2, 3, 4, 2, 5]))

//2

function reverseString(str){
    return str.split('').reverse().join('');
}

console.log(reverseString("Hello"))
console.log(reverseString("JavaScript"))

//3

function binarySearch(arr, x){

    arr.sort();
    let l = 0;
    let r = arr.length - 1;

    while(l < r){
        let mid = (l + r) / 2;
        if(arr[mid] === x){
            return mid;
        }else{
            if(arr[mid] > x){
                r = mid - 1;
            }else{
                l = mid + 1;
            }
        }
    }
    return -1;
}

//4

console.log(binarySearch([1, 2, 3, 4, 5], 3))
console.log(binarySearch([1, 2, 3, 4, 5], 6))

function removeDuplicates(arr){
    arr.sort();

    for(let i=0; i<arr.length; i++){
        while(arr[i] === arr[i+1]){
            arr.splice(i, 1);
        }
    }
    return arr;
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]))
console.log(removeDuplicates(['a', 'b', 'a', 'c', 'b']))



//Phan 2 here

if (localStorage.length === 0) {
        document.getElementById('notFound').style.visibility = 'show';
  } else {
        document.getElementById('notFound').style.visibility = 'hidden';
}
