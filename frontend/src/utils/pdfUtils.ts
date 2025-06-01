import { generatePortfolioPDF } from './pdfGenerator';

// PDF 생성 시 로딩 UI를 보여주는 래퍼 함수
export const generatePDFWithLoading = async (portfolioId: string): Promise<void> => {
  // 로딩 오버레이 생성
  const loadingOverlay = document.createElement('div');
  loadingOverlay.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    ">
      <div style="
        width: 60px;
        height: 60px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      "></div>
      <h3 style="margin: 0 0 10px 0; font-size: 18px;">PDF 생성 중...</h3>
      <p style="margin: 0; font-size: 14px; opacity: 0.8;">잠시만 기다려주세요</p>
      
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </div>
  `;
  
  document.body.appendChild(loadingOverlay);
  
  try {
    await generatePortfolioPDF(portfolioId);
  } catch (error) {
    console.error('PDF 생성 실패:', error);
    throw error;
  } finally {
    // 로딩 오버레이 제거
    if (document.body.contains(loadingOverlay)) {
      document.body.removeChild(loadingOverlay);
    }
  }
};

// 메인 익스포트
export { generatePortfolioPDF } from './pdfGenerator';
export * from './imageHelpers';
