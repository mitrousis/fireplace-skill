const { SerialPort } = require('serialport')

const portPath = '/dev/tty.usbmodem1411301'
const serialport = new SerialPort({ path: portPath, baudRate: 19200 })

const valueByte = ''
const count = 0

runTest()

const commOn = '111001101001011001101010101110100101101010100101101011100101010101011001011010111001011010010101100110101110010101011010100101101011100101010101011001011010111010010101101001100101100000000000'
const commIndex = 0
// serialport.on('data', function (data) {
//   // console.log(String(data))
//   const matchVal = String(data).match(/^[0,1]$/gm)
//   if (matchVal) {
//     valueByte += matchVal[0]
//   }

//   if (valueByte.length === 50) {
//     console.log(valueByte)
//     valueByte = ''
//   }
// })

function runTest() {
  // serialport.write('ver\r', function (err, results) {
  //   if (err) {
  //     console.log('Failed to write to port: ' + err)
  //   }
  // })
  // const gpioIndex = 0

  // setInterval(() => {
  //   serialport.write('gpio read ' + 0 + '\r', function (err, results) {
  //     if (err) {
  //       console.log('Failed to write to port: ' + err)
  //     }
  //   })
  // }, 100)

  // clearBit()
  serialport.write('gpio clear ' + 8 + '\r', function (err, results) {
    if (err) {
      console.log('Failed to write to port: ' + err)
    }
  })

  serialport.write('gpio set ' + 8 + '\r', function (err, results) {
    if (err) {
      console.log('Failed to write to port: ' + err)
    }
  })

  serialport.write('gpio clear ' + 8 + '\r', function (err, results) {
    if (err) {
      console.log('Failed to write to port: ' + err)
    }
  })

  setTimeout(() => {
    console.log('done')
  }, 1000)
}

function sendBit() {
  // serialport.write('gpio set ' + 8 + '\r', function (err, results) {
  //   if (err) {
  //     console.log('Failed to write to port: ' + err)
  //   }
  // })

  // // count++

  // if (count < 20) {
  //   setTimeout(() => {
  //     clearBit()
  //   }, 10)
  // } else {
  //   serialport.write('gpio clear ' + 8 + '\r', function (err, results) {
  //     if (err) {
  //       console.log('Failed to write to port: ' + err)
  //     }
  //   })
  // }
}

function clearBit() {
  serialport.write('gpio clear ' + 8 + '\r', function (err, results) {
    if (err) {
      console.log('Failed to write to port: ' + err)
    }
  })

  setTimeout(() => {
    sendBit()
  }, 10)
}
