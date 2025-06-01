import { useEffect, useState } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('🌐 Network: Back online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('🚫 Network: Gone offline');
    };

    // 연결 속도 감지
    const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;

    const updateConnectionInfo = () => {
      if (connection) {
        const slowTypes = ['slow-2g', '2g', '3g'];
        setIsSlowConnection(slowTypes.includes(connection.effectiveType));
        console.log('📡 Connection type:', connection.effectiveType);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
      updateConnectionInfo(); // 초기 설정
    }

    // 정리
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  return { isOnline, isSlowConnection };
};
