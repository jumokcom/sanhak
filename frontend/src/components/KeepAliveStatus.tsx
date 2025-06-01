import React from 'react';
import styled from 'styled-components';
import { useKeepAlive } from '../hooks/useKeepAlive';

const StatusContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 12px;
  z-index: 1000;
  max-width: 250px;
  
  @media (max-width: 768px) {
    display: none; // 모바일에서는 숨김
  }
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusLabel = styled.span`
  opacity: 0.7;
`;

const StatusValue = styled.span<{ isActive?: boolean; hasError?: boolean }>`
  color: ${props => 
    props.hasError ? '#ff6b6b' : 
    props.isActive ? '#51cf66' : '#ffd43b'
  };
  font-weight: bold;
`;

interface KeepAliveStatusProps {
  show?: boolean;
}

export const KeepAliveStatus: React.FC<KeepAliveStatusProps> = ({ 
  show = process.env.NODE_ENV === 'development' 
}) => {
  const { isActive, lastPing, error } = useKeepAlive({
    enabled: process.env.NODE_ENV === 'production',
    interval: 10,
  });

  if (!show) return null;

  const formatTime = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <StatusContainer>
      <StatusRow>
        <StatusLabel>Keep-Alive:</StatusLabel>
        <StatusValue isActive={isActive} hasError={!!error}>
          {error ? 'Error' : isActive ? 'Active' : 'Inactive'}
        </StatusValue>
      </StatusRow>
      <StatusRow>
        <StatusLabel>Last Ping:</StatusLabel>
        <StatusValue>{formatTime(lastPing)}</StatusValue>
      </StatusRow>
      {error && (
        <StatusRow>
          <StatusLabel>Error:</StatusLabel>
          <StatusValue hasError={true}>
            {error.message.substring(0, 20)}...
          </StatusValue>
        </StatusRow>
      )}
    </StatusContainer>
  );
};
