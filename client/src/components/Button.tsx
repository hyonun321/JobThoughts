import styled from 'styled-components';
import { theme } from '../styles/theme';

type ButtonProps = {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: keyof typeof theme.colors | string;
  size?: keyof typeof theme.fontSize | string;
  padding?: string;
  transition?: string;
  hoverColor?: keyof typeof theme.colors | string;
  backgroundColor?: keyof typeof theme.colors | string;
  border?: string;
  boxShadow?: string;
};

const ButtonStyle = styled.button<{
  $color?: keyof typeof theme.colors | string;
  $size?: keyof typeof theme.fontSize | string;
  $padding?: string;
  $transition?: string;
  $hoverColor?: keyof typeof theme.colors | string;
  $backgroundColor?: keyof typeof theme.colors | string;
  $border?: string;
  $boxShadow?: string;
}>`
  padding: ${({ $padding }) => $padding || '16px 24px'};
  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : theme.colors.primary};

  font-size: ${({ theme, $size }) => theme.fontSize[$size as keyof typeof theme.fontSize] || $size};
  color: ${({ theme, $color }) => theme.colors[$color as keyof typeof theme.colors] || 'white'};

  ${({ $border }) =>
    $border &&
    `
  border: ${border};
`}
  border-radius:100px;

  ${({ $boxShadow }) =>
    $boxShadow &&
    `
  box-shadow: ${$boxShadow};
`}

  ${({ $transition }) => $transition && `transition: ${$transition};`}

${({ theme, $hoverColor }) =>
    $hoverColor &&
    `
  &:hover {
    background-color: ${theme.colors[$hoverColor as keyof typeof theme.colors] || $hoverColor};
    color: white;
  }
`}
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray400};
    color: white;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default function Button({
  text,
  onClick,
  disabled = false,
  color = 'white',
  size = '16px',
  padding = '16px 24px',
  transition,
  hoverColor,
  backgroundColor = 'primary',
  border,
  boxShadow,
}: ButtonProps) {
  return (
    <ButtonStyle
      onClick={onClick}
      disabled={disabled}
      $color={color}
      $size={size}
      $padding={padding}
      $transition={transition}
      $hoverColor={hoverColor}
      $backgroundColor={backgroundColor}
      $border={border}
      $boxShadow={boxShadow}
    >
      {text}
    </ButtonStyle>
  );
}
