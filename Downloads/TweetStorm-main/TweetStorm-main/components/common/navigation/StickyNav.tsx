'use client';
import { useTheme } from '@/hooks/hooks';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import NavigationMenu from './NavigationMenu';

function StickyNav() {
  const scroll = useRef<number>(0);
  const { theme } = useTheme();
  const background = theme === 'dark' ? 'bg-gray-900' : 'bg-white';

  useEffect(() => {
    function handleScroll() {
      const header = document.getElementById('header');
      scroll.current = window.scrollY;
      if (scroll.current == 0) {
        header?.classList.add('bg-transparent');
        header?.classList.remove(
          'border-b',
          'shadow-[#00000040_0px_2px_3px]',
          'dark:border-b-black'
        );
        header?.classList.remove(background);
      } else {
        header?.classList.remove('bg-transparent');
        header?.classList.add(background);
        header?.classList.add(
          'border-b',
          'dark:border-b-black',
          'shadow-[#00000040_0px_2px_3px]'
        );
      }
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [background]);

  return (
    <div
      id='header'
      className={clsx(
        'fixed top-0 w-full responsive-pad-navigation z-25',
        background
      )}
    >
      <NavigationMenu />
    </div>
  );
}

export default StickyNav;
