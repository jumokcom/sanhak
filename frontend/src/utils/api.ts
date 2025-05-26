// API 기본 설정
const API_BASE_URL = 'http://localhost:3001/api';

// API 호출 헬퍼 함수
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('jwt_token');
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: defaultHeaders,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  // 응답 바디가 비어있으면 null 리턴 (DELETE 등)
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return null;
  }

  return response.json();
};

// 포트폴리오 API 함수들
export const portfolioApi = {
  // 모든 포트폴리오 조회
  getAllPortfolios: () => apiCall('/portfolios'),

  // 내 포트폴리오 조회
  getMyPortfolios: () => apiCall('/portfolios/my'),

  // 특정 포트폴리오 조회
  getPortfolio: (id: number) => apiCall(`/portfolios/${id}`),

  // 포트폴리오 생성
  createPortfolio: (portfolioData: any) => 
    apiCall('/portfolios', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    }),

  // 포트폴리오 수정
  updatePortfolio: (id: number, portfolioData: any) =>
    apiCall(`/portfolios/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(portfolioData),
    }),

  // 포트폴리오 삭제
  deletePortfolio: (id: number) =>
    apiCall(`/portfolios/${id}`, {
      method: 'DELETE',
    }),
};
