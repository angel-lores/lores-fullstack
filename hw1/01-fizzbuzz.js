/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions: 
- For numbers divisible by 3, print “fizz” 
- For numbers divisible by 5 (but not 3), print “buzz” 
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

**/
for (let i = 1; i <= 100; i += 1) {
  if (i % 15 === 0) {
    // i divisible by both 3 and 5
    console.log("fizzbuzz");
  } else if (i % 3 === 0) {
    // i divisible by 3
    console.log("fizz");
  } else if (i % 5 === 0) {
    // i divisible by 5
    console.log("buzz");
  } else {
    console.log(i);
  }
}

// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// fizz
// buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// ...
