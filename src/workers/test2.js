const os = require('os')
const path = require('path')
const { Worker } = require('worker_threads')

const userCPUCount = os.cpus().length
const workerPath = path.resolve('factorialWorkers.js')

async function factorialWrokers(number) {
  if (number === 0) {
    return 1
  }
  const numbers = []

  for (let i = 1n; i <= number; i++) {
    numbers.push(i)
  }

  const segmentSize = Math.ceil(numbers.length / userCPUCount)
  const segments = []

  for (let segmentIndex = 0; segmentIndex < userCPUCount; segmentIndex++) {
    const start = segmentIndex * segmentSize
    const end = start + segmentSize

    const segment = numbers.slice(start, end)
    segments.push(segment)
  }

  const promises = segments.map(segment => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: segment,
      })
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      })
    })
  })

  let factorial = await Promise.all(promises).then(results => {
    let response = 1n
    for (let i = 0; i < results.length; i++) {
      response = response * results[i]
    }
    return response
  })

  return {
    number,
    factorial
  }
}

async function run() {
  let number = 30000n

  console.time('factorialWrokers')
  console.log(await factorialWrokers(number))
  console.timeEnd('factorialWrokers')
}

run()
