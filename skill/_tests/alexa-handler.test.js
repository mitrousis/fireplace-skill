const lambda = require('../src/handlers/alexa-handler.js')

describe('Event handling', function () {
  test('Discovery request', async () => {
    // Invoke helloFromLambdaHandler()
    const result = await lambda.helloFromLambdaHandler()
    /*
            The expected result should match the return from your Lambda function.
            e.g.
            if you change from `const message = 'Hello from Lambda!';` to `const message = 'Hello World!';` in hello-from-lambda.js
            you should change the following line to `const expectedResult = 'Hello World!';`
        */
    const expectedResult = 'Hello from Lambda!'
    // Compare the result with the expected result
    expect(result).toEqual(expectedResult)
  })
})
