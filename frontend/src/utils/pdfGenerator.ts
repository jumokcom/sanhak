import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// 이미지 로딩을 보장하는 함수
const waitForImagesToLoad = async (element: HTMLElement): Promise<void> => {
  const images = element.querySelectorAll('img');
  const imagePromises = Array.from(images).map((img) => {
    return new Promise<void>((resolve) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // 에러가 나도 계속 진행
      }
    });
  });
  
  await Promise.all(imagePromises);
  // 추가 대기 시간 (이미지 렌더링 완료 보장)
  await new Promise(resolve => setTimeout(resolve, 500));
};

// 이미지를 Base64로 변환하는 함수
const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    // 이미지 URL이 data: 또는 blob:으로 시작하면 그대로 반환
    if (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
      return imageUrl;
    }

    // Canvas를 사용해서 이미지를 Base64로 변환
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // CORS 문제 해결
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const base64 = canvas.toDataURL('image/jpeg', 0.8);
          resolve(base64);
        } else {
          reject(new Error('Canvas context not available'));
        }
      };
      
      img.onerror = () => {
        console.warn('이미지 로드 실패, 기본 이미지 사용:', imageUrl);
        resolve(imageUrl); // 실패해도 원본 URL 반환
      };
      
      img.src = imageUrl;
    });
  } catch (error) {
    console.warn('이미지 변환 실패:', error);
    return imageUrl; // 실패시 원본 URL 반환
  }
};
interface PortfolioData {
  id: string;
  title: string;
  profile: {
    name: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
    introduction: string;
    image?: string;
    sns?: Array<{ type: string; url: string }>;
  };
  educations?: Array<{
    school: string;
    major: string;
    degree: string;
    startDate: string;
    endDate: string;
    isAttending: boolean;
    description?: string;
  }>;
  careers?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    isWorking: boolean;
    description?: string;
  }>;
  certificates?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  languages?: Array<{
    language: string;
    testName: string;
    score: string;
    date?: string;
  }>;
  awards?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  projects?: Array<{
    title: string;
    role: string;
    startDate: string;
    endDate: string;
    isOngoing: boolean;
    scope: string;
    skills: string[];
    serviceUrl?: string;
    githubUrl?: string;
    description: string;
  }>;
  about?: {
    growth: string;
    personality: string;
    experience: string;
  };
}

// 이력서 HTML 템플릿 생성 (이미지와 완전히 동일한 형태)
const createResumeHTML = async (data: PortfolioData): Promise<string> => {
  // 프로필 이미지를 Base64로 변환
  let profileImageBase64 = '';
  if (data.profile.image) {
    try {
      profileImageBase64 = await convertImageToBase64(data.profile.image);
      console.log('프로필 이미지 변환 성공:', profileImageBase64.substring(0, 50) + '...');
    } catch (error) {
      console.warn('프로필 이미지 변환 실패:', error);
    }
  }
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return `만 ${age}세`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  return `
    <div style="
      font-family: 'Malgun Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 20mm;
      background: white;
      color: #333;
      font-size: 11pt;
      line-height: 1.4;
      box-sizing: border-box;
      position: relative;
    ">
      <!-- 이력서 제목 -->
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="
          font-size: 20pt;
          font-weight: bold;
          margin: 0;
          color: #333;
          letter-spacing: 8px;
        ">이력서</h1>
      </div>

      <!-- 기본 기본정보 섹션 -->
      <div style="
        background: #f5f5f5;
        border: 1px solid #ccc;
        padding: 12px;
        margin-bottom: 20px;
        border-radius: 3px;
      ">
        <h3 style="
          margin: 0 0 10px 0;
          color: #333;
          font-size: 12pt;
          font-weight: bold;
        ">기본 기본정보</h3>
        
        <div style="display: flex; gap: 15px;">
          <!-- 프로필 사진 -->
          <div style="
            width: 130px;
            height: 170px;
            border: 1px solid #ccc;
            background: #f5f5f5;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            ${profileImageBase64 ? `
              <img src="${profileImageBase64}" 
                   style="width: 100%; height: 100%; object-fit: cover;" 
                   alt="프로필 사진" 
                   crossorigin="anonymous" />
            ` : `
              <div style="
                text-align: center;
                color: #999;
                font-size: 10pt;
                line-height: 1.2;
              ">사진</div>
            `}
          </div>

          <!-- 기본 정보 테이블 -->
          <div style="flex: 1; margin-left: 10px;">
            <table style="
              width: 100%;
              border-collapse: collapse;
              font-size: 10pt;
            ">
              <tr>
                <td style="
                  padding: 8px 12px;
                  background: #e9e9e9;
                  border: 1px solid #ccc;
                  font-weight: bold;
                  width: 80px;
                  text-align: center;
                ">성명</td>
                <td colspan="3" style="
                  padding: 8px 12px;
                  border: 1px solid #ccc;
                  background: white;
                ">${data.profile.name || ''}</td>
              </tr>
              <tr>
                <td style="
                  padding: 8px 12px;
                  background: #e9e9e9;
                  border: 1px solid #ccc;
                  font-weight: bold;
                  text-align: center;
                ">연락처</td>
                <td colspan="3" style="
                  padding: 8px 12px;
                  border: 1px solid #ccc;
                  background: white;
                ">${data.profile.phone || ''}</td>
              </tr>
              <tr>
                <td style="
                  padding: 8px 12px;
                  background: #e9e9e9;
                  border: 1px solid #ccc;
                  font-weight: bold;
                  text-align: center;
                ">이메일</td>
                <td colspan="3" style="
                  padding: 8px 12px;
                  border: 1px solid #ccc;
                  background: white;
                  font-size: 9pt;
                ">${data.profile.email || ''}</td>
              </tr>
              <tr>
                <td style="
                  padding: 8px 12px;
                  background: #e9e9e9;
                  border: 1px solid #ccc;
                  font-weight: bold;
                  text-align: center;
                ">SNS</td>
                <td colspan="3" style="
                  padding: 8px 12px;
                  border: 1px solid #ccc;
                  background: white;
                  font-size: 8pt;
                ">${data.profile.sns && data.profile.sns.length > 0 ? data.profile.sns[0].url : ''}</td>
              </tr>
              <tr>
                <td style="
                  padding: 8px 12px;
                  background: #e9e9e9;
                  border: 1px solid #ccc;
                  font-weight: bold;
                  text-align: center;
                ">한줄소개</td>
                <td colspan="3" style="
                  padding: 8px 12px;
                  border: 1px solid #ccc;
                  background: white;
                ">${data.profile.introduction || '한줄 소개를 입력해주세요'}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <!-- 학력 -->
      <div style="margin-bottom: 20px;">
        <h3 style="
          background: #f5f5f5;
          border: 1px solid #ccc;
          padding: 8px 12px;
          margin: 0 0 0 0;
          color: #333;
          font-size: 12pt;
          font-weight: bold;
        ">학력</h3>
        
        <table style="
          width: 100%;
          border-collapse: collapse;
          font-size: 10pt;
          border: 1px solid #ccc;
        ">
          <thead>
            <tr style="background: #e9e9e9;">
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">입학일</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 25%;
              ">학교명</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">학과</th>
            </tr>
          </thead>
          <tbody>
            ${data.educations && data.educations.length > 0 ? 
              data.educations.map(edu => `
                <tr>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${formatDate(edu.startDate)} - ${edu.isAttending ? '재학중' : formatDate(edu.endDate)}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${edu.school}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${edu.major}</td>
                </tr>
              `).join('') 
            : `
              <tr>
                <td colspan="3" style="
                  padding: 20px;
                  text-align: center;
                  color: #999;
                  border: 1px solid #ccc;
                  background: white;
                ">학력 정보가 없습니다.</td>
              </tr>
            `}
          </tbody>
        </table>
      </div>

      <!-- 경력 -->
      <div style="margin-bottom: 20px;">
        <h3 style="
          background: #f5f5f5;
          border: 1px solid #ccc;
          padding: 8px 12px;
          margin: 0 0 0 0;
          color: #333;
          font-size: 12pt;
          font-weight: bold;
        ">경력</h3>
        
        <table style="
          width: 100%;
          border-collapse: collapse;
          font-size: 10pt;
          border: 1px solid #ccc;
        ">
          <thead>
            <tr style="background: #e9e9e9;">
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">입사일</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 25%;
              ">근무기간</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">담당업무</th>
            </tr>
          </thead>
          <tbody>
            ${data.careers && data.careers.length > 0 ? 
              data.careers.map(career => `
                <tr>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${career.company}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${formatDate(career.startDate)} - ${career.isWorking ? '재직중' : formatDate(career.endDate)}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${career.position}</td>
                </tr>
              `).join('') 
            : `
              <tr>
                <td colspan="3" style="
                  padding: 20px;
                  text-align: center;
                  color: #999;
                  border: 1px solid #ccc;
                  background: white;
                ">경력사항이 없습니다.</td>
              </tr>
            `}
          </tbody>
        </table>
      </div>

      <!-- 부가정보 -->
      <div style="margin-bottom: 20px;">
        <h3 style="
          background: #f5f5f5;
          border: 1px solid #ccc;
          padding: 8px 12px;
          margin: 0 0 0 0;
          color: #333;
          font-size: 12pt;
          font-weight: bold;
        ">부가정보</h3>
        
        <table style="
          width: 100%;
          border-collapse: collapse;
          font-size: 10pt;
          border: 1px solid #ccc;
        ">
          <thead>
            <tr style="background: #e9e9e9;">
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">구분</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 30%;
              ">내용</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 25%;
              ">기관</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">취득일</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">점수/등급</th>
            </tr>
          </thead>
          <tbody>
            ${data.certificates && data.certificates.length > 0 ? 
              data.certificates.map(cert => `
                <tr>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">자격증</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    background: white;
                  ">${cert.name}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${cert.issuer}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${cert.date}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">-</td>
                </tr>
              `).join('') 
            : ''}
            ${data.languages && data.languages.length > 0 ? 
              data.languages.map(lang => `
                <tr>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">어학</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    background: white;
                  ">${lang.language}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${lang.testName}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${lang.date || '-'}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${lang.score}</td>
                </tr>
              `).join('') 
            : ''}
            ${data.awards && data.awards.length > 0 ? 
              data.awards.map(award => `
                <tr>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">수상</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    background: white;
                  ">${award.name}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${award.issuer}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${award.date}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">-</td>
                </tr>
              `).join('') 
            : ''}
            ${(!data.certificates || data.certificates.length === 0) && 
              (!data.languages || data.languages.length === 0) && 
              (!data.awards || data.awards.length === 0) ? `
              <tr>
                <td colspan="5" style="
                  padding: 20px;
                  text-align: center;
                  color: #999;
                  border: 1px solid #ccc;
                  background: white;
                ">부가정보가 없습니다.</td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>

      <!-- 프로젝트 -->
      <div style="margin-bottom: 20px;">
        <h3 style="
          background: #f5f5f5;
          border: 1px solid #ccc;
          padding: 8px 12px;
          margin: 0 0 0 0;
          color: #333;
          font-size: 12pt;
          font-weight: bold;
        ">프로젝트</h3>
        
        <table style="
          width: 100%;
          border-collapse: collapse;
          font-size: 10pt;
          border: 1px solid #ccc;
        ">
          <thead>
            <tr style="background: #e9e9e9;">
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 20%;
              ">기간</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 25%;
              ">프로젝트명</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">역할</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 15%;
              ">규모</th>
              <th style="
                padding: 8px;
                border: 1px solid #ccc;
                font-weight: bold;
                width: 25%;
              ">기술스택</th>
            </tr>
          </thead>
          <tbody>
            ${data.projects && data.projects.length > 0 ? 
              data.projects.map(project => `
                <tr>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                    font-size: 8pt;
                  ">${formatDate(project.startDate)} ~<br/>${project.isOngoing ? '진행중' : formatDate(project.endDate)}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    background: white;
                  ">${project.title}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${project.role}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: white;
                  ">${project.scope || '개인'}</td>
                  <td style="
                    padding: 8px;
                    border: 1px solid #ccc;
                    background: white;
                    font-size: 9pt;
                  ">${project.skills && project.skills.length > 0 ? project.skills.join(', ') : '-'}</td>
                </tr>
              `).join('') 
            : `
              <tr>
                <td colspan="5" style="
                  padding: 20px;
                  text-align: center;
                  color: #999;
                  border: 1px solid #ccc;
                  background: white;
                ">프로젝트 정보가 없습니다.</td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 2페이지: 자기소개서 -->
    ${data.about && (data.about.growth || data.about.personality || data.about.experience) ? `
      <div style="
        font-family: 'Malgun Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 20mm;
        background: white;
        color: #333;
        font-size: 11pt;
        line-height: 1.4;
        box-sizing: border-box;
        position: relative;
        page-break-before: always;
      ">
        <!-- 자기소개서 제목 -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="
            font-size: 20pt;
            font-weight: bold;
            margin: 0;
            color: #333;
            letter-spacing: 8px;
          ">자기소개서</h1>
        </div>

        <!-- 자기소개서 내용 -->
        <div style="
          background: #f9f9f9;
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 5px;
        ">
          ${data.about.growth ? `
            <div style="margin-bottom: 30px;">
              <h3 style="
                margin: 0 0 15px 0;
                font-size: 14pt;
                color: #333;
                padding-bottom: 8px;
                border-bottom: 2px solid #333;
                font-weight: bold;
              ">1. 성장과정</h3>
              <p style="
                margin: 0;
                font-size: 11pt;
                line-height: 1.8;
                color: #444;
                text-align: justify;
                text-indent: 1em;
              ">${data.about.growth}</p>
            </div>
          ` : ''}
          ${data.about.personality ? `
            <div style="margin-bottom: 30px;">
              <h3 style="
                margin: 0 0 15px 0;
                font-size: 14pt;
                color: #333;
                padding-bottom: 8px;
                border-bottom: 2px solid #333;
                font-weight: bold;
              ">2. 성격 및 장단점</h3>
              <p style="
                margin: 0;
                font-size: 11pt;
                line-height: 1.8;
                color: #444;
                text-align: justify;
                text-indent: 1em;
              ">${data.about.personality}</p>
            </div>
          ` : ''}
          ${data.about.experience ? `
            <div>
              <h3 style="
                margin: 0 0 15px 0;
                font-size: 14pt;
                color: #333;
                padding-bottom: 8px;
                border-bottom: 2px solid #333;
                font-weight: bold;
              ">3. 경험 및 경력사항</h3>
              <p style="
                margin: 0;
                font-size: 11pt;
                line-height: 1.8;
                color: #444;
                text-align: justify;
                text-indent: 1em;
              ">${data.about.experience}</p>
            </div>
          ` : ''}
        </div>
      </div>
    ` : ''}
  `;
};

// PDF 생성 및 다운로드 함수
export const generatePortfolioPDF = async (portfolioId: string): Promise<void> => {
  try {
    console.log('📝 PDF 생성 시작...');
    
    // 포트폴리오 데이터 가져오기
    const API_BASE_URL = process.env.NODE_ENV === 'production' 
      ? 'https://sanhak-backend.onrender.com/api'
      : 'http://localhost:3001/api';

    const token = localStorage.getItem('jwt_token');
    const response = await fetch(`${API_BASE_URL}/portfolios/${portfolioId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('포트폴리오 데이터를 가져올 수 없습니다.');
    }

    const portfolioData: PortfolioData = await response.json();
    console.log('📄 포트폴리오 데이터 로드 완료');

    // HTML 요소 생성 (비동기 처리)
    const htmlContent = await createResumeHTML(portfolioData);
    console.log('🌎 HTML 콘텐츠 생성 완료');
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.background = 'white';
    document.body.appendChild(tempDiv);

    console.log('🖼️ 이미지 로딩 대기 중...');
    // 이미지 로딩 대기
    await waitForImagesToLoad(tempDiv);
    console.log('✅ 이미지 로딩 완료');

    console.log('📷 Canvas 변환 시작...');
    // HTML을 Canvas로 변환 (안전한 옵션만 사용)
    const canvas = await html2canvas(tempDiv, {
      useCORS: true,
      allowTaint: false,
      background: '#ffffff',
      width: 800,
      height: tempDiv.scrollHeight
    });
    
    console.log('📝 PDF 변환 시작...');
    // Canvas를 PDF로 변환
    const imgData = canvas.toDataURL('image/png', 1.0); // 최고 품질
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // 첫 페이지 추가
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 필요한 경우 추가 페이지 생성
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // 임시 요소 제거
    document.body.removeChild(tempDiv);
    console.log('🧺 임시 요소 정리 완료');

    // PDF 다운로드
    const fileName = `${portfolioData.profile.name}_이력서_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    console.log('✅ PDF 생성 완료:', fileName);
    alert('🎉 PDF가 성공적으로 다운로드되었습니다!');

  } catch (error) {
    console.error('❌ PDF 생성 실패:', error);
    alert('⚠️ PDF 생성에 실패했습니다. 다시 시도해주세요.');
  }
};
