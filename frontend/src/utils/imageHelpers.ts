// 이미지 프록시 서비스를 통한 CORS 우회 (선택사항)
const getProxiedImageUrl = (imageUrl: string): string => {
  // 이미 데이터 URL이거나 로컬 URL인 경우 그대로 반환
  if (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:') || imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  // 외부 이미지의 경우 프록시 서비스 사용 (필요시)
  // return `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
  
  // 일단은 원본 URL 반환
  return imageUrl;
};

// 이미지 URL이 유효한지 확인하는 함수
const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && (contentType ? contentType.startsWith('image/') : false);
  } catch {
    return false;
  }
};

export { 
  getProxiedImageUrl,
  isValidImageUrl 
};
