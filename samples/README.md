# node-simconnect samples

Most users will find `apiHelper` sample helpful.

The samples in the `advanced` directory uses the "low level" `SimConnectConnection` class, which should be easy to work with if you are familiar with the official SDK for C/C++/C#.

## Running samples

In order to run the samples you first need to build the `node-simconnect` project (from the root folder):

```
npm install
npm run build
```

Then (still from the `node-simconnect` root folder) run:

`npx ts-node .\\samples\\<filename>.ts`
