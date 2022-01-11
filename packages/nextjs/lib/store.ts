import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

export const nextjsSlice = createSlice({
  name: 'nextjs',
  initialState: {
    country: '',
    city: '',
    ready: false,
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload
    },
    setCountry(state, action) {
      state.country = action.payload
    },
    setReady(state, action) {
      state.ready = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        country: action.payload.nextjs.country || '',
        city: action.payload.nextjs.city || '',
      };
    },
  },
});

const makeStore = () =>
  configureStore({
    reducer: {
      [nextjsSlice.name]: nextjsSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore);
