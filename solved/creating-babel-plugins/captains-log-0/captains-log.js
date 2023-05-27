// babel exercise 0 (captains-log)
// When you're finished with this exercise, run
//   "npm start exercise.babel.1"
//   to move on to the next exercise

/* eslint no-unused-vars:0 */

export default function(babel) {
  // I'm leavning this here for you because it's handy :)
  const {types: t} = babel

  return {
    name: 'captains-log',
    visitor: {
      CallExpression(path) {
        const isConsoleCall = looksLike(path, {
          node: {
            callee: {
              object: {
                name: 'console',
              },
              property: {
                name: 'log',
              },
            },
          },
        })
        if (!isConsoleCall) {
          return
        }

        const {line, column} = path.node.loc.start
        path.node.arguments.unshift(
          t.stringLiteral(`${line}:${column}`),
        )
      },
    },
  }
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
