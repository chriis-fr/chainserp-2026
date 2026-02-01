import Image from 'next/image';
import styled from 'styled-components';

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

const Wrapper = styled.span`
  display: inline-flex;
  border-radius: 1rem;
  overflow: hidden;

  body.next-dark-theme & {
    background: #d9d9d9;
    padding: 0.15rem;
  }
`;

export default function Logo({
  width = 75,
  height = 75,
  className,
}: LogoProps) {
  return (
    <Wrapper className={className}>
      <Image
        src="/chainsnobg.PNG"
        alt="Chains ERP"
        width={width}
        height={height}
        priority
      />
    </Wrapper>
  );
}
