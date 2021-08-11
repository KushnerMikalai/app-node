function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default sleep

// import sleep from './sleep';
// async function demo() {
//   console.log('Taking a break...');
//   await sleep(2000);
//   console.log('Two seconds later, showing sleep in a loop...');

//   for (let i = 0; i < 5; i++) {
//     if (i === 3)
//       await sleep(2000);
//     console.log(i);
//   }
// }
// demo();
