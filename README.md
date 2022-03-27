# redux -CRUD

<img src="https://media.giphy.com/media/aCXvQejjleXRNuC3D4/giphy.gif" width="100%" height="100%"/>

## store

In store.js

```
import { configureStore } from "@reduxjs/toolkit";
import friendsListReducer from "../features/friendsList";

export const store = configureStore({
  reducer: {
    friendsList: friendsListReducer,
  },
});
```
