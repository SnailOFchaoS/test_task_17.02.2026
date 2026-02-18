import { AppProvider } from './store';
import { MainPage } from './pages';

function App() {
  return (
    <AppProvider>
      <MainPage />
    </AppProvider>
  );
}

export default App;
