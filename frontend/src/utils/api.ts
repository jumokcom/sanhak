// API 기본 설정
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://sanhak-backend.onrender.com/api'
  : 'http://localhost:3001/api';

console.log('API_BASE_URL:', API_BASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

// API 호출 헬퍼 함수
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('jwt_token');
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  console.log('API 호출:', `${API_BASE_URL}${endpoint}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: defaultHeaders,
      ...options,
    });

    console.log('API 응답 상태:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 에러 응답:', errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // 응답 바디가 비어있으면 null 리턴 (DELETE 등)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }

    const data = await response.json();
    console.log('API 응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
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
