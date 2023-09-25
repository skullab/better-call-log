![alt BetterCallLogo](./images/better_call_log_enhanced_logo.png)

### Installation
```bash
npm install better-call-log
```

> **NOTE:** The enhanced version is available from release 1.0.0 
<br><span style="color:orange">Old versions are no longer compatible.</span>

### Usage
```js
import BetterCall from "better-call-log"

const logger = new BetterCall.Logger();
logger.debug("Hello World !");

// example output : 
// 2023-09-25T15:15:53.291Z DEBUG Logger : Hello World !
```

### Options
```js
const logger = new BetterCall.Logger({
    name: "MyLogger",
    severities: BetterCall.Severity.WARNING,
    formatter: new BetterCall.CSSFormatter(),
    transports: [new BetterCall.ConsoleTransport()]
});
```

When you create a new instance of a logger you can define the logger options.
```ts
name:string - the name of the logger
severities:Severity - the minimum severity to fire log
formatter:ILoggerFormatter - the formatter to use, by default is SimpleFormatter
transports:ILoggerTransport[] - the transports to use, by default is ConsoleTransport
```
#### Severities

BetterCallLog implements the Syslog Protocol ([RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424)). In descending order of severity, these log levels are: emergency, alert, critical, error, warning, notice, info, and debug.

```js
logger.emergency('some important message...');
logger.alert('some important message...');
logger.critical('some important message...');
logger.error('some important message...');
logger.err('some important message...'); // alias of error
logger.warning('some important message...');
logger.warn('some important message...'); // alias of warning
logger.notice('some important message...');
logger.log('some important message...'); // alias of notice
logger.info('some important message...');
logger.debug('some important message...');
```

with the severities option it is possible to limit the sending of messages to a certain level.

```js
const logger = new BetterCall.Logger({
    name: "MyLogger",
    severities: BetterCall.Severity.WARNING,
    formatter: new BetterCall.CSSFormatter(),
    transports: [new BetterCall.ConsoleTransport()]
});
logger.emergency('some important message...');
logger.alert('some important message...');
logger.critical('some important message...');
logger.error('some important message...');
logger.err('some important message...'); // alias of error
logger.warning('some important message...');
logger.warn('some important message...'); // alias of warning

// the messages below will not be sent
logger.notice('some important message...');
logger.log('some important message...'); // alias of notice
logger.info('some important message...');
logger.debug('some important message...');
```

#### Formatters

All messages are converted according to the syslog protocol specifications.
Subsequently, using a formatter it is possible to format the message according to a specific model.

#### Available formatters:

- ANSIFormatter
- CSSFormatter
- JSONFormatter
- SimpleFormatter
- StringFormatter
- SyslogFormatter

if the formatter is not defined, the default formatter is SimpleFormatter.
#### Tranports

The transport object has the task of transporting the message to a specific output. It is possible to define more than one tranport in the logger options. 

#### Available transports:

- ConsoleTransport
- FileTransport
- HttpTransport
- IndexedDBTransport

If a transport is not defined, the default transport is ConsoleTransport.

#### Add transport at run-time, specify a temporary transport

You can add or remove a transport at run-time with **addTransport** and **removeTransport**.

```js
const logger = new BetterCall.Logger({
    transports: [new BetterCall.ConsoleTranport()]
});
logger.addTransport(new BetterCall.HttpTransport({
    method: "post",
    url: "http://localhost/logs",
}));
logger.debug("Hello World !");
```

To specify a temporary transport use the **to** function

```js
const logger = new BetterCall.Logger({
    transports: [new BetterCall.ConsoleTranport()]
});
// define new temporary tranport at run-time
logger.to(new BetterCall.HttpTransport({
    method: "post",
    url: "http://localhost/logs",
})).debug("Hello World !");

// or define it by name
const logger = new BetterCall.Logger({
    transports: [
        new BetterCall.ConsoleTranport(),
        new BetterCall.HttpTransport({
            name:'http'
            method: "post",
            url: "http://localhost/logs",
        })
    ]
});
logger.to('http').debug("Hello World !");
```

> **NOTE:** Temporary tranports are only used **once**. By defining the transport by name, any other transports defined in the logger options will not be executed.

#### Add a TAG

You can define a TAG for the log message.
```js
const logger = new BetterCall.Logger({
    transports: [new BetterCall.ConsoleTranport()]
});
logger.debug('MYTAG','hello world');

// example output : 
// 2023-09-25T15:14:40.661Z DEBUG Logger::MYTAG : hello world
```
This way the tag is set dynamically, but it is possible to define a global TAG.

```js
const logger = new BetterCall.Logger({
    transports: [new BetterCall.ConsoleTransport()]
});
logger.setTag('MYTAG');
logger.debug('hello world');
logger.debug('an other message');
```

it is possible to define a temporary TAG with the **withTag** function.

```js
const logger = new BetterCall.Logger({
    transports: [new BetterCall.ConsoleTransport()]
});
logger.setTag('MYTAG');
logger.debug('hello world');
logger.withTag('OTHERTAG').debug('an other message');
logger.info('important message');

// example output : 
// 2023-09-25T15:17:43.598Z DEBUG Logger::MYTAG : hello world
// 2023-09-25T15:17:43.599Z DEBUG Logger::OTHERTAG : an other message
// 2023-09-25T15:17:43.600Z INFO Logger::MYTAG : important message
```