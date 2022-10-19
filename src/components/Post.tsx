import { formatDistance } from 'date-fns';
import styled from 'styled-components';

import type { Article } from 'src/api';
import useGetMetaImage from 'src/hooks/useGetMetaImage';

const StyledArticle = styled.article`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-clr);

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledImage = styled.div<{ isLoading: boolean }>`
  width: 33.3333%;
  height: 22rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    filter: ${(props) =>
      props.isLoading
        ? 'blur(4px)'
        : 'drop-shadow(0 0 15px rgba(0, 0, 0, 0.2))'};
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Type = styled.span`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: var(--secondary-clr);
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.625rem;
  font-weight: 500;
`;

const Link = styled.a`
  background: linear-gradient(to right, transparent, transparent),
    linear-gradient(to right, #4158d0, #c850c0);
  background-size: 100% 2px, 0 2px;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.25s ease-out;

  :hover,
  :focus {
    background-size: 0 2px, 100% 2px;
  }
`;

const Description = styled.p`
  margin: 0 0 1.5rem;
`;

const Info = styled.span`
  margin-top: auto;
  margin-bottom: 1rem;
  color: var(--info-clr);
  font-size: 0.875rem;
`;

const Author = styled.span`
  font-weight: 700;
`;

const Post: React.FC<Article> = ({
  author,
  createdAt,
  title,
  text,
  type,
  url,
}) => {
  const { imageUrl, isLoading } = useGetMetaImage(url);

  return (
    <StyledArticle>
      <StyledImage isLoading={isLoading}>
        {/* eslint-disable-next-line @next/next/no-img-element -- unknown domains */}
        <img src={imageUrl} alt={title} />
      </StyledImage>

      <Body>
        <Type>{type}</Type>
        <Title>
          <Link href={url} target="_blank" rel="noreferrer">
            {title}
          </Link>
        </Title>
        <Description>{text}</Description>
        <Info>
          By <Author>{author}</Author>&nbsp;
          {formatDistance(new Date(createdAt), new Date())} ago
        </Info>
      </Body>
    </StyledArticle>
  );
};

export default Post;
