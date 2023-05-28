// codemod exercise 0 (ymnn-jquery)
// When you're finished with this exercise, run
//   "npm start exercise.codemod.1"
//   to move on to the next exercise

import pluginTester from 'babel-plugin-tester'
import ymnnJquery from './ymnn-jquery'

pluginTester({
  plugin: ymnnJquery,
  tests: [
    {code: 'foo.hide();', snapshot: false},
    {code: `$(el).hide();`, snapshot: true},
  ],
})


//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=ASTs&e=codemod%20exercise%201&em=thiago.resende.cadastros@gmail.com
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
