import { AppProvider } from './store';
import { MainPage, MainPageMobile } from './pages';
import { useIsMobileVersion } from './hooks';

function App() {
  const isMobileVersion = useIsMobileVersion();

  return (
    <AppProvider>
      {isMobileVersion ? <MainPageMobile /> : <MainPage />}
    </AppProvider>
  );
}

export default App;
