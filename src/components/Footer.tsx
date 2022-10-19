import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  padding: 1.5rem var(--hor-padding);
  color: var(--info-clr);
  border-top: 1px solid var(--border-clr);
`;

const Footer = () => {
  return (
    <StyledFooter>
      &copy;&nbsp;2022 Ivan Romakh. All rights reserved.
    </StyledFooter>
  );
};

export default Footer;
