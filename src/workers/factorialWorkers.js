const { parentPort, workerData } = require('worker_threads')

// get the array numbers
const numbers = workerData

function calculateFactorial(numArray) {
  let response = 1n

  for (let i = 0; i < numArray.length; i++) {
    response = response * numArray[i]
  }

  return response
}

const result = calculateFactorial(numbers)

// return result
parentPort.postMessage(result)