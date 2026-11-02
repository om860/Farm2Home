import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  ThemeProvider,
  ProfileProvider,
  SavedProvider,
  LocationProvider,
} from './hooks/useAppState';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ProfileProvider>
        <LocationProvider>
          <SavedProvider>
            <App />
          </SavedProvider>
        </LocationProvider>
      </ProfileProvider>
    </ThemeProvider>
  </StrictMode>,
);
