// babel exercise 3 (captains-log)
// When you're finished with this exercise, run
//   "npm start exercise.babel.4"
//   to move on to the next exercise

import pluginTester from 'babel-plugin-tester'
import captainsLog from './captains-log'

pluginTester({
  plugin: captainsLog,
  snapshot: true,
  tests: [
    {code: `anything.log();`, snapshot: false},
    `console.log('sup dawg')`,
    `
      function add(a, b) {
        console.log(a, b)
        return a + b
      }
    `,
    `
      const multiply = (a, b) => {
        console.log(a, b)
        return a * b
      }
    `,
    `
      const divide = function(a, b) {
        console.log(a, b)
        return a / b
      }
    `,
  ],
})


//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=ASTs&e=babel%20exercise%204&em=thiago.resende.cadastros@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
