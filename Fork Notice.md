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
var io = require('socket.io')(server, { log: false, transport: ["websocket"] });
```
#### V2.0 Changes
Added Room handler as well. and added `roomSize` for calculating User size. Renamed `server.js` as `index.js`. Changed transport from **HTTP Polling(The default)** as **Websocket** since there's a good reason why i use Websocket:
 - VoIP, is **NOT** Better with HTTP Polling, Since they're upgrade everytime, A audio will got cut a little and can caused a fatal issue.
 - We do not want to send a lot of request to server. 
 - VoIP in Web, Only better with **Websocket**.
I also using volatile event which is a feature by socket.io. More info can found at https://socket.io/docs/v4/emitting-events/#Volatile-events

## Frontend Changes
### 1. I modified `index.html`
I added **Viewport** so mobile user can visit it in responsive page. Also changed width of two canvas (Both Input and output audio) into `100%` so both canvas will have a same width with user screen width. Changed Socket.io script path (`/socket.io/socket.io.js`), And moved **Start Taking** to Bottom Screen.

#### V2.0 Changes
Added `input` with `button` element for changing room.

### 2. I modified `main.css`
Because i don't want to get any stress, The **Start Button** and both Input and Output canvas is modified with this blank file into actual CSS file.
### 3. I modified `voip.js`
Due to deprecated old API `navigator.getUserMedia`, I replaced it with the new ones as `navigator.mediaDevices.getUserMedia`, Also removed those function for clean/fresh audio quality:
 - AudioOscillator
 - BiquadFilter
 - DynamicCompression

Keep in mind that this will transmit a lot of data in second. Not only that, Noise Suppression is not available because i removed these function and can caused your Speaker Sound to be listened by your mic.

#### V2.0 Changes
I added change Room support, Well.
### 4. I removed `socket.io.js`
From earlier, Socket.io already gave a path to their socket.io script from beginning: `/socket.io/socket.io.js`. So i guess we do not need it either way.

### 5. I modified `main.js`
This file changed on version v2.0. Also like i said before, Added Submit button trigger so we can change room. Also using volatile event feature by socket.io
## Any question?
I active both Discord and Telegram. So you can ask at those chat platform:
- [Discord Server](https://discord.gg/9S3ZCDR)
- [Telegram Group](https://t.me/yonlecoder)
