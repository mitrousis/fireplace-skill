const Alexa = require('ask-sdk-core')

exports.handler = function (request, context) {
  console.log(request, context)

  if (request.directive.header.namespace === 'Alexa.Discovery' && request.directive.header.name === 'Discover') {
    log('DEBUG:', 'Discover request', JSON.stringify(request))
    handleDiscovery(request, context, '')
  } else if (request.directive.header.namespace === 'Alexa.PowerController') {
    if (request.directive.header.name === 'TurnOn' || request.directive.header.name === 'TurnOff') {
      log('DEBUG:', 'TurnOn or TurnOff Request', JSON.stringify(request))
      handlePowerControl(request, context)
    }
  }

  function handleDiscovery (request, context) {
    const payload = {
      endpoints:
        [
          {
            endpointId: 'demo_id',
            manufacturerName: 'Smart Device Company',
            friendlyName: 'Bedroom Outlet',
            description: 'Smart Device Switch',
            displayCategories: ['SWITCH'],
            additionalAttributes: {
              manufacturer: 'Smart Device Company',
              model: 'Sample Model',
              serialNumber: 'U11112233456',
              firmwareVersion: '1.24.2546',
              softwareVersion: '1.036',
              customIdentifier: 'Sample custom ID'
            },
            cookie: {
              key1: 'arbitrary key/value pairs for skill to reference this endpoint.',
              key2: 'There can be multiple entries',
              key3: 'but they should only be used for reference purposes.',
              key4: 'This is not a suitable place to maintain current endpoint state.'
            },
            capabilities:
              [
                {
                  type: 'AlexaInterface',
                  interface: 'Alexa',
                  version: '3'
                },
                {
                  interface: 'Alexa.PowerController',
                  version: '3',
                  type: 'AlexaInterface',
                  properties: {
                    supported: [{
                      name: 'powerState'
                    }],
                    retrievable: true
                  }
                }
              ]
          }
        ]
    }
    const header = request.directive.header
    header.name = 'Discover.Response'
    log('DEBUG', 'Discovery Response: ', JSON.stringify({ header: header, payload: payload }))
    context.succeed({ event: { header: header, payload: payload } })
  }

  function log (message, message1, message2) {
    console.log(message + message1 + message2)
  }

  function handlePowerControl (request, context) {
    // get device ID passed in during discovery
    const requestMethod = request.directive.header.name
    const responseHeader = request.directive.header
    responseHeader.namespace = 'Alexa'
    responseHeader.name = 'Response'
    responseHeader.messageId = responseHeader.messageId + '-R'
    // get user token pass in request
    const requestToken = request.directive.endpoint.scope.token
    let powerResult

    if (requestMethod === 'TurnOn') {
      // Make the call to your device cloud for control
      // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
      powerResult = 'ON'
    } else if (requestMethod === 'TurnOff') {
      // Make the call to your device cloud for control and check for success
      // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
      powerResult = 'OFF'
    }
    const contextResult = {
      properties: [{
        namespace: 'Alexa.PowerController',
        name: 'powerState',
        value: powerResult,
        timeOfSample: '2017-09-03T16:20:50.52Z', // retrieve from result.
        uncertaintyInMilliseconds: 50
      }]
    }
    const response = {
      context: contextResult,
      event: {
        header: responseHeader,
        endpoint: {
          scope: {
            type: 'BearerToken',
            token: requestToken
          },
          endpointId: 'demo_id'
        },
        payload: {}
      }
    }
    log('DEBUG', 'Alexa.PowerController ', JSON.stringify(response))
    context.succeed(response)
  }
}

// const HelloWorldIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
//   },
//   async handle(handlerInput) {
//     const { accessToken } = handlerInput.requestEnvelope.context.System.user;
//     let speechText = '';

//     if (!accessToken) {
//       speechText = 'You must authenticate with your Amazon Account to use this skill. I sent instructions for how to do this in your Alexa App';
//       return handlerInput.responseBuilder
//         .speak(speechText)
//         .withLinkAccountCard()
//         .getResponse();
//     } else {
//       speechText = 'Hello World!';
//       return handlerInput.responseBuilder
//         .speak(speechText)
//         .getResponse();
//     }
//   }
// }
