# Fork Notice
Read this file to know what i modify and what it do.

## Some notice
I see the original repos seems no changes for 2 years, I also noticed that some API is deprecated and well, and some of them aren't working anymore, I change it a little bit so it would better. Like what the README said, Use WebRTC for doing Professional VoIP thing. Anyways i hope you enjoy it. 

## Backend Changes
### 1. I modified `server.js`
Due to newer Socket.io listen function, I changed these code at line 24:
```js
var io = require('socket.io').listen(server, { log: false });
```
Into:
```js
var io = require('socket.io')(server, { log: false });
```
## Frontend Changes
### 1. I modified `index.html`
I added **Viewport** so mobile user can visit it in responsive page. Also changed width of two canvas (Both Input and output audio) into `100%` so both canvas will have a same width with user screen width. Changed Socket.io script path (`/socket.io/socket.io.js`), And moved **Start Taking** to Bottom Screen.

### 2. I modified `main.css`
Because i don't want to get any stress, The **Start Button** and both Input and Output canvas is modified with this blank file into actual CSS file.

### 3. I modified `main.js`
Due to deprecated old API `navigator.getUserMedia`, I replaced it with the new ones as `navigator.mediaDevices.getUserMedia`, Also disabled those function for clean/fresh audio quality:
 - AudioOscillator
 - BiquadFilter
 - DynamicCompression

Keep in mind that this will transmit a lot of data in second. Not only that, Noise Suppression is not available because i disabled these function and can caused your Speaker Sound to be listened by your mic.

### 4. I removed `socket.io.js`
From earlier, Socket.io already gave a path to their socket.io script from beginning: `/socket.io/socket.io.js`. So i guess we do not need it either way.

## Any question?
I active both Discord and Telegram. So you can ask at those chat platform:
- [Discord Server](https://discord.gg/9S3ZCDR)
- [Telegram Group](https://t.me/yonlecoder)
