import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Car(props) {
  return <h2>I am a {props.color + props.custom} Car!</h2>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Car color="red" custom="test" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
