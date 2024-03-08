// for (let i = 1; i <= 100; i++) {
// 	if (i % 5 === 0 && i % 3 === 0) console.log("FizzBuzz");
// 	else if (i % 5 === 0) console.log("Buzz");
// 	else if (i % 3 === 0) console.log("Fizz");
// 	else console.log(i);
// }

// function cardDistro(arr) {
// 	let newArr = [];
// 	let times = 2;

// 	for (let i = 0; i <= arr.length; i++) {
// 		if (arr[i] % 2 === 1) {
// 			newArr.push(arr[i]);
// 		}
// 	}

// 	console.log(newArr);
// 	let len = arr.length;
// 	console.log(len / newArr.length);
// 	if (newArr.length <= arr.length) {
// 		arr.forEach((el) => newArr.push(el * times));
// 	}

// 	console.log(newArr);
// }

// cardDistro([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// Document.

function isEven(number) {
	if (number === 0) return true;
	return isOdd(number - 1);
}

function isOdd(number) {
	if (number === 0) return false;
	return isEven(number - 1);
}

console.log(isEven(4), isOdd(5));
