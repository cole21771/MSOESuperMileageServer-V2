# MSOESuperMileageServerV2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000`. The app will automatically reload if you change any of the source files.

## Production server

Run `npm run-script production` for a production server. Navigate to `http://localhost:3000`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Communication with App
### Request Configuration File
Event: "getConfig", Parameters: undefined, Callback: (configJSON)

### Send new data
Event: "newData", Parameters: "[data]", Callback: undefined

### Authentication
Event: "appAuth", Parameters: undefined, Callback: undefined 
