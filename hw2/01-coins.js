/** Exercise 01 - Coins **/

// Add your function here
function calculateChange(total) {
  if (typeof total !== "number" || Number.isNaN(total) || !isFinite(total)) {
    return "Error: the number is invalid";
  }
  if (total < 0) {
    return "Error: the number is negative";
  }
  if (total > 100) {
    return "Error: the number is too large";
  }

  const coins = [
    { name: "dollar", value: 100 },
    { name: "quarter", value: 25 },
    { name: "dime", value: 10 },
    { name: "nickel", value: 5 },
    { name: "penny", value: 1 },
  ];

  const parts = [];

  let remainder = Math.round(total * 100);

  for (const coin of coins) {
    const count = Math.floor(remainder / coin.value);
    remainder -= count * coin.value;
    if (count > 0) {
      let label = coin.name;

      if (count !== 1) {
        if (label === "penny") label = "pennies";
        else label += "s";
      }
      parts.push(`${count} ${label}`);
    }
  }
  if (parts.length === 0) return "no change";
  else return parts.join(", ");
}

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(-5));
// -$5.00 ==> Error: negative number
console.log(calculateChange("abc"));
// "abc" ==> Error: invalid number
console.log(calculateChange(0));
// $0.00 ==> no change
console.log(calculateChange(1.01));
// $1.01 ==> 1 dollar, 1 penny
console.log(calculateChange(2.35));
// $2.35 ==> 2 dollars, 1 quarter, 1 dime
console.log(calculateChange(0.99));
// $0.99 ==> 3 quarters, 2 dimes, 4 pennies
