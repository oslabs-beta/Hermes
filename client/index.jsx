import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { RecoilRoot } from 'recoil';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
