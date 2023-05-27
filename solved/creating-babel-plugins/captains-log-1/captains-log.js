// babel exercise 1 (captains-log)
// When you're finished with this exercise, run
//   "npm start exercise.babel.2"
//   to move on to the next exercise

export default function(babel) {
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
        let prefix = ''
        const parentFunction = path.findParent(parent => t.isFunctionDeclaration(parent))
        if (parentFunction) {
          prefix = `${parentFunction.node.id.name} `
        }

        const {line, column} = path.node.loc.start

        prefix += `${line}:${column}`
        path.node.arguments.unshift(t.stringLiteral(prefix))
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
