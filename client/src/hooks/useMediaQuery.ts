import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = () => setMatches(media.matches);

    // 초기값 설정
    setMatches(media.matches);

    // 리스너 등록
    media.addEventListener('change', handleChange);

    // 클린업
    return () => media.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

// 사용 예시
// 직접 해당하는 css 를 넣습니다.
// const isHeightMobile = useMediaQuery('(max-height: 768px)');
