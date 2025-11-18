const math = require('./math');

// Do Destructuring
//const {addFn, subFn} = require('./math');


console.log("Hello World!")

// V8 Engine directly embedede nahi hai node js mai bht si changes hain just like below 

// Window aur Dom ki tarah ki cheezain node pr available nahi hoti Is mai Js 
// ki core functionallity hai bss
//console.log(window);

// Give Empty Object
//console.log(math);

//console.log("Math Valye is :", math)

//console.log("Math Valye is :", math(2,4))

// console.log("Additon is :", math.addFn(2,4))
// console.log("Subtraction is :", math.subFn(4,2))

console.log("Additon is :", math.addFn(2,4))
console.log("Subtraction is :", math.subFn(4,2))
