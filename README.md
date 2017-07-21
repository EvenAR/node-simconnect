# node-simconnect
Wrapper for the SimConnect SDK for FSX and Prepar3D (Windows only!)

This project is at a very early stage and only covers a few SimConnect function calls. Feel free to join the development :)

## Build
### Requirements
* Node.js (32-bit version)
* Visual Studio 2013 (32-bit version)
* FSX or P3D SimConnect SDK files (.lib and .h). 

NOTE: If your app need to work with both FSX and P3D you must use the FSX SDK.

### Manual build
Due to the licensing of the Flight Simulator / Prepar3D SDK, those libraries are not included in this repository, so automatic build is not possible at the moment. 

To build the native node module you must provide your own SDK files. For FSX:SE, these can be found under `FSX\SDK\Core Utilities Kit\SimConnect SDK`. Follow these steps carefully:

* Clone this repository (or use `npm install --save node-simconnect`).
* Inside the new `node-simconnect` directory (or `node-modules/node-simconnect`), create a folder named `SimConnect` and copy the two folders `inc` and `lib` from the SimConnect SDK installation over to the new directory. These should include `SimConnect.h` and `SimConnect.lib`, respectively.
* From the `node-simconnect` directory:
  * if you cloned this repo with git, run `npm install`,
  * or if you installed the package with npm, run `node-gyp configure rebuild --msvs_version=2013 --arch=ia32`.
* If everything went well you should be able to run the simple example program: `node examples/nodejs/example.js` (note: FSX/P3D must be already running).

### Using the wrapper in a Electron or NW.JS project
To use native node packages with Electron or NW.JS, the package must be built specifically for these frameworks. Read more here: [Electron](https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md),  [NW.JS](http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/) 

* To build native Electron addon: `node-gyp rebuild --target=1.6.11 --arch=ia32 --msvs_version=2013` (where `--target` is the version of Electron).
* To build native NW.JS addon: `nw-gyp rebuild --target=0.20.3 --arch=ia32 --msvs_version=2013` (where `--target` is the version of NW.JS).
