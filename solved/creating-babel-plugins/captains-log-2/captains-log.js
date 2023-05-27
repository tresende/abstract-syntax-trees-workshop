// babel exercise 2 (captains-log)
// When you're finished with this exercise, run
//   "npm start exercise.babel.3"
//   to move on to the next exercise



export default function(babel) {
  const {types: t} = babel

  return {
    name: 'ast-transform', // not required
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
        let prefix = getParentFunctionName(path, t)
        const start = path.node.loc.start
        prefix += ` ${start.line}:${start.column}`
        path.node.arguments.unshift(t.stringLiteral(prefix.trim()))
      },
    },
  }
}

function getParentFunctionName(path, t) {
  let functionDeclaration = path.findParent(parent => t.isFunctionDeclaration(parent))

  if (functionDeclaration) {
    return functionDeclaration.node.id.name
  }

  functionDeclaration = path.findParent(parent => t.isVariableDeclarator(parent))

  if (functionDeclaration) {
    const isArrowFunction = looksLike(functionDeclaration, {
      node: {
        init: {
          type: 'ArrowFunctionExpression',
        },
      },
    })

    if (isArrowFunction) {
      return (functionDeclaration.node.id.name)
    }
  }
  return ''
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
