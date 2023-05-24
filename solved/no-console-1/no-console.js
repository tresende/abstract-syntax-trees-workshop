// eslint exercise 1 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.2"
//   to move on to the next exercise
const disallowedMethods = ['log', 'warn', 'info']

module.exports = {
  create(context) {
    return {
      Identifier(node) {

        // if (
        //   node.name === "console" &&
        //   node.parent.type == "MemberExpression" &&
        //   node.parent.parent.type == "CallExpression" &&
        //   disallowedMethods.includes(node.parent.property.name)
        // )
  

        const isConsoleCall = looksLike(node, {
          name: 'console',
          parent: {
            type: 'MemberExpression',
            parent: {
              type: 'CallExpression',
            },
            property: {
              name: value => disallowedMethods.includes(value),
            },
          },
        })
        if (isConsoleCall) {
          context.report({
            node,
            message: 'Using console is not allowed',
          })
        }
      },
    }
  },
}


function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
