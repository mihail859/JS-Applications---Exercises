// console.log("Hello.");
// setTimeout(function() {
// console.log("Goodbye!");
// }, 2000);
// console.log("Hello again!");

console.log('Before promise');


new Promise(function(resolve, reject) {
    setTimeout(function() {
    resolve('done');
    }, 500);
    })
    .then(function(res) {
    console.log('Then returned: ' + res);
    });

    console.log('After promise');    