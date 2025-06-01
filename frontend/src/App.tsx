import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditPage from "./pages/EditPage";
import ViewPage from "./pages/ViewPage";
import GlobalStyle from "./styles/GlobalStyle";
import { useKeepAlive } from "./hooks/useKeepAlive";
import { KeepAliveStatus } from "./components/KeepAliveStatus";

const App = () => {
  // Keep-Alive 기능 활성화 (프로덕션 환경에서만)
  const { isActive, lastPing, error } = useKeepAlive({
    enabled: process.env.NODE_ENV === 'production',
    interval: 10, // 10분마다
    onSuccess: (data) => {
      console.log('✨ Keep-alive ping successful:', data);
    },
    onError: (err) => {
      console.warn('⚠️ Keep-alive ping failed:', err.message);
    },
  });

  // 개발 중에만 Keep-Alive 상태 로그 출력
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isActive) {
      console.log('📱 Keep-alive is active');
      console.log('🕰️ Last ping:', lastPing);
      if (error) {
        console.log('❌ Error:', error.message);
      }
    }
  }, [isActive, lastPing, error]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </Router>
      <KeepAliveStatus />
    </>
  );
};

export default App;
