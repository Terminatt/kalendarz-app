import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { ResizeListenerWrapper } from '@contexts/ResizeListenerContext/ResizeListenerWrapper';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import App from './App';
import 'dayjs/locale/pl';

dayjs.locale('pl');
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ResizeListenerWrapper>
                    <App />
                </ResizeListenerWrapper>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line @typescript-eslint/no-floating-promises
reportWebVitals();
