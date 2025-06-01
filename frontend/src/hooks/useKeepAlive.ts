import { useEffect, useRef, useState } from 'react';
import { keepAliveApi } from '../utils/api';
import { useNetworkStatus } from './useNetworkStatus';

interface UseKeepAliveOptions {
  enabled?: boolean;
  interval?: number; // 분 단위
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useKeepAlive = (options: UseKeepAliveOptions = {}) => {
  const {
    enabled = true,
    interval = 10, // 기본 10분마다
    onSuccess,
    onError,
  } = options;

  const [isActive, setIsActive] = useState(enabled);
  const [lastPing, setLastPing] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isOnline, isSlowConnection } = useNetworkStatus();

  const ping = async () => {
    // 네트워크가 오프라인이면 스킨
    if (!isOnline) {
      console.log('😴 Keep-alive skipped: offline');
      return;
    }

    try {
      const result = await keepAliveApi.ping();
      setLastPing(new Date());
      setError(null);
      onSuccess?.(result);
      console.log('Keep-alive ping successful:', result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      onError?.(error);
      console.error('Keep-alive ping failed:', error);
    }
  };

  const start = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // 즉시 한 번 실행
    ping();

    // 주기적으로 실행
    intervalRef.current = setInterval(ping, interval * 60 * 1000);
    setIsActive(true);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
  };

  useEffect(() => {
    if (enabled) {
      start();
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [enabled, interval]);

  // 네트워크 상태 변경 시 처리
  useEffect(() => {
    if (isOnline && enabled && !intervalRef.current) {
      console.log('🔄 Network back online - restarting keep-alive');
      start();
    }
  }, [isOnline, enabled]);

  return {
    isActive,
    lastPing,
    error,
    isOnline,
    isSlowConnection,
    start,
    stop,
    ping,
  };
};
