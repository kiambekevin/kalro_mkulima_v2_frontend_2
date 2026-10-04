import { useCallback, useRef, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

export function useMegaMenu() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [openId, setOpenId] = useState(null);
  const timerRef = useRef(null);

  const closeAll = useCallback((except) => {
    setOpenId((cur) => (cur && cur !== except ? null : cur));
  }, []);

  const toggle = useCallback((id) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  const openOnHover = useCallback(
    (id) => {
      if (!isDesktop) return;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setOpenId(id), 90);
    },
    [isDesktop]
  );

  const closeOnLeave = useCallback(() => {
    if (!isDesktop) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpenId(null), 160);
  }, [isDesktop]);

  return { isDesktop, openId, toggle, openOnHover, closeOnLeave, closeAll, setOpenId };
}