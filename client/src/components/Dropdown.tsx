import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ChevronIcon from '../assets/icons/icon-dropdown.svg';

type DropdownProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder: string;
};

const fadeSlideIn = keyframes`
  0% { opacity: 0; transform: translateY(-10px) scaleY(0.95); }
  100% { opacity: 1; transform: translateY(0) scaleY(1); }
`;

const fadeSlideOut = keyframes`
  0% { opacity: 1; transform: translateY(0) scaleY(1); }
  100% { opacity: 0; transform: translateY(-10px) scaleY(0.95); }
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 200px;
  z-index: 3;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Icon = styled.img<{ isOpen: boolean }>`
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const Menu = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 1rem;
  padding: 0.5rem 0;
  box-shadow: 2px 2px 2px rgba(55, 55, 55, 0.25);
  z-index: 10;
  animation: ${({ isOpen }) => (isOpen ? fadeSlideIn : fadeSlideOut)} 0.2s ease-out forwards;
  transform-origin: top center;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  @media (max-width: 768px) {
    border-radius: 0.5rem;
  }
`;
const Button = styled.button<{ isOpen: boolean; isPlaceholder: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  min-height: 48px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.m};
    border-radius: 0.5rem;
    width: 100%;
    min-height: 42px;
  }
  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    gap: 0.2rem;
  }
`;

const MenuItem = styled.li<{ selected: boolean }>`
  margin: 6px auto;
  width: 90%;
  max-width: 180px;
  height: 40px;
  text-align: center;
  border-radius: 1rem;
  line-height: 40px;
  font-size: ${({ theme }) => theme.fontSize.ml};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.gray900)};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  z-index: 10;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.s};
    border-radius: 0.6rem;
  }
  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export default function Dropdown({ options, selected, onSelect, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isPlaceholder = selected === '';

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 메뉴 토글
  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
      setIsVisible(true);
    }
  };

  // 메뉴 닫기 처리
  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 200);
  };

  return (
    <Wrapper ref={ref}>
      <Button onClick={toggleMenu} isOpen={isOpen} isPlaceholder={isPlaceholder}>
        {isPlaceholder ? placeholder : selected}
        <Icon src={ChevronIcon} alt="dropdown icon" isOpen={isOpen} />
      </Button>

      {isVisible && (
        <Menu isOpen={isOpen}>
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === selected}
              onClick={() => {
                onSelect(option);
                closeMenu();
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}
