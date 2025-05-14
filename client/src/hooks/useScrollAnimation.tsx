import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';

//📌useScrollAnimaion훅
//   요소가 화면에 일정 비율 이상 보이면(inView), 애니메이션을 실행(controls.start('visible'))하도록 제어하는 훅
export default function useScrollAnimation(amount = 0.5) {
  const ref = useRef(null); // 1️⃣ 트래킹할 DOM 요소를 가리킴
  const inView = useInView(ref, { once: false, amount }); // 2️⃣ 요소가 뷰포트에 들어왔는지 확인
  const controls = useAnimation(); // 3️⃣ Framer Motion의 애니메이션 컨트롤러

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden'); //4️⃣ 보이면 visible, 아니면 hidden 상태로 애니메이션 상태 전환
  }, [inView, controls]);

  return { ref, controls }; //5️⃣ 컴포넌트에서 사용할 수 있도록 반환
}
