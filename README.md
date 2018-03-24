# MSOESuperMileageServerV2
Development of this project is done in Jetbrains Webstorm with Node.js LTS

## Installation
Navigate to the `client` folder.
Open a command prompt and run `npm install`

Navigate to the `server` folder.
Open a command prompt and run `npm install`

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:3000`. The app will automatically reload if you change any of the source files.

## Production server
### Windows
Run `npm run production` for a production server. Then navigate to `http://localhost:3000`.
### Linux
Run `npm run production-linux` for a linux ready production server. Then navigate to `http://localhost:3000`

## Endpoints
All network communication is done with Socket.IO

## TODO List
### Priority Tasks
- [ ] Redesign AppComponent
- [ ] Add tests everywhere

### Dev Tasks
- [ ] Convert the application to a PWA
- [ ] Research Service runner production instance with auto release pulling

### Location Stuffs
- [ ] Start Component Inheritance For Map
- [ ] Find a Angular 5 Google Maps library
- [ ] Create LocationService

### Review Data
- [ ] Lots of stuff

### Home
- [X] Graph Views
- [ ] Display Always

### Admin
- [ ] Allow creation of graphs
- [ ] Allow creation of views
- [ ] Change selected config
- [ ] Come up with ways to send data back
