# persistent-react-template

### About

This is the perfect template to start a React app with Redux in a persistent state, with SCSS preconfigured to hot reload.

If your anal about every minor style tweak or javascript refactor, this is for you! Check out this explaination video

at: https://www.youtube.com/watch?v=CVrXupl6uH8

### Install

'git clone https://github.com/jackmead515/persistent-react-template'

'npm install'

'npm start'

That's it!

### To start modifying...

Add in a new folder under scenes, and create a new react component and register it in the RootScene component. 
All components related to that scene should exist under that directory in it's own 'components' folder. Like so...
```
- scenes/
  -- Dashboard/
    --- index.js
    --- components/
      ---- someComponent.js
  -- About/
    --- index.js
    --- components/
      --- someOtherComponent.js
```   
 All universal components should go in the src/components/ folder. 
 
 ### To add in Routes with react-router...
 
 Add these lines to the root index.js file...
```
  import { Route, Router } from "react-router";
  import createBrowserHistory from "history/createBrowserHistory";
  
  export const history = createBrowserHistory();
```
 and under the ReactDOM.render function, replace the RootScene with...
```
<Router history={history}>
  <div>
    <Route exact path="/home" component={Home} />
    <Route exact path="/about" component={About} />
  </div>
</Router>
```
 The routes underneath the div should be replaced with whatever scene you want! Or, you can change that to whatever your heart desires.
 
 Happy Coding! :D
 
 
 
 
