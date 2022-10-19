import Link from 'next/link';
import styled from 'styled-components';

const StyledHeader = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--header-height);
  padding: 0 var(--hor-padding);
  background-color: #fff;
  z-index: 10;
`;

const StyledLink = styled.a`
  font-size: 1.375rem;
  font-weight: 900;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link href="/" passHref>
        <StyledLink>Pocket MD</StyledLink>
      </Link>
    </StyledHeader>
  );
};

export default Header;
