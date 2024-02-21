// console.log("Hello.");
// setTimeout(function() {
// console.log("Goodbye!");
// }, 2000);
// console.log("Hello again!");

console.log('Before promise');


const myPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
    resolve('done');
    }, 500);
});
myPromise.then(function(res) {
    console.log('Then returned: ' + res);
});


    console.log('After promise');    