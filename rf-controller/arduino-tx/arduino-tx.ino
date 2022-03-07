// RF LINK TRANSMITTER CODE
// #include "lib/VirtualWire/VirtualWire.h"

void setup()
{
  Serial.begin(9600);    // Debugging only
  Serial.println("Initialize RF Link Tx Code");

  // Initialise the IO and ISR
//  vw_set_ptt_inverted(true); // Required for DR3100
//  vw_setup(2000);     // Bits per sec
//  vw_set_tx_pin(3);         //Pin 3 is connected to "Digital Output" of transmitter
pinMode(3, OUTPUT);

//  //Set pins as input for buttons
   pinMode(8, INPUT_PULLUP);
      pinMode(9, INPUT_PULLUP);
//  pinMode(9, INPUT_PULLUP);
//  pinMode(10, INPUT_PULLUP);
//  pinMode(11, INPUT_PULLUP);
//
//  //Set pin for LED as status indicator
//  pinMode (13, OUTPUT);
//
//  //Initialize button pins
//  digitalWrite(8, HIGH);
//  digitalWrite(9, HIGH);
//  digitalWrite(10, HIGH);
//  digitalWrite(11, HIGH);
}

void loop()
{
 
//   char *msg = "1010"; //message to send
//    tx_debug(msg); //output message to serial monitor for debugging.
//    vw_send((uint8_t *)msg, strlen(msg));//send message
//    vw_wait_tx(); // Wait until the whole message is gone

if(!digitalRead(8) || !digitalRead(9)){
  

  for(int r = 0; r < 4; r++ ) {
    // "on
    const char commandOn[]  = "111001101001011001101010101110100101101010100101101011100101010101011001011010111001011010010101100110101110010101011010100101101011100101010101011001011010111010010101101001100101100000000000";
    // const char commandOFF[] = "1110011010010110011010101001110100101101010100101101001110010101010101100101101001110010101100101010101101011101001100110101001101101011100110010101010110010110111001101001011010100110100000000000";

    const char command[] = "1110011010010110011010101001110100101101010100101101001110010101010101100101101001110010101100101010101101011101001100110101001101101011100110010101010110010110111001101001011010100110100000000000";

    
//    if(!digitalRead(8)){
//      Serial.println("trigger on");
//      char(&command)[strlen(commandOn)] = commandOn;
//    } else if(!digitalRead(9)){
//      Serial.println("trigger off");
//      char(&command)[strlen(commandOff)] = commandOff
//    }

    if(!digitalRead(9)) {
     
    
      for(int i = 0; i < strlen(command); i++ ) {
        char c = command[i];
       
        if(c == '1'){
          digitalWrite(3, HIGH);
          delayMicroseconds(300);
        } else {
          digitalWrite(3, LOW);
          delayMicroseconds(500);
        }
       }

    }
  }
  
  delay(5000); 
}


//  digitalWrite(3, HIGH);
//
//    delay(100);   
//
//     digitalWrite(3, LOW);
//
//
//     delay(200); 
//    //delayMicroseconds(us)

 
}

void tx_debug(char *temp_msg){
  //output to serial monitor to indicate which button pressed
  Serial.println(temp_msg);
}
