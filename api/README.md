## Motivation

This project don't have an integration with REST APIs, in this case I chose to build my "backend logic" 
using this directory using Vue.Observable as state management.

Every folder in this directory represents an module and witch module organized following this structure:

```
  api/
    purchase/
      state.js  // store the state using Vue.observable
      mutations.js // apply modifications on state 
      actions.js //   apply all logic necessary to handle application necessities
```
