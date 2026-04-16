setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => setTimeout(() => console.log("timeout"), 0));
console.log("sync");