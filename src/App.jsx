import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CropRecommendationPage from './pages/CropRecommendationPage';
import CropLibraryPage from './pages/CropLibraryPage';
import CropDiseasePage from './pages/CropDiseasePage';
import WeatherPage from './pages/WeatherPage';
import FertilizerPage from './pages/FertilizerPage';
import MarketPricesPage from './pages/MarketPricesPage';
import PesticidePlannerPage from './pages/PesticidePlannerPage';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import CommunityPage from './pages/CommunityPage';
import AIAssistantPage from './pages/AIAssistantPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
          <Route path="/crop-library" element={<CropLibraryPage />} />
          <Route path="/crop-library/:cropId" element={<CropLibraryPage />} />
          <Route path="/crop-disease" element={<CropDiseasePage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/fertilizer" element={<FertilizerPage />} />
          <Route path="/market-prices" element={<MarketPricesPage />} />
          <Route path="/pesticide-planner" element={<PesticidePlannerPage />} />
          <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
