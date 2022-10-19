import { gql, useLazyQuery } from '@apollo/client';
import type { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import client, { Article } from 'src/api';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Post from 'src/components/Post';
import useGlobalEvent from 'src/hooks/useGlobalEvent';

const PAGE_SIZE = 30;
const SCROLL_GUTTER = 400;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Main = styled.main`
  min-height: 100vh;
  padding-top: var(--header-height);
`;

const Cover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45vh;
  padding: 0 var(--hor-padding);
  background-color: #4158d0;
  background-size: 200% 200%;
  background-image: linear-gradient(43deg, #4158d0, #c850c0, #ffcc70);
  animation: ${gradient} 10s ease infinite;
`;

const Title = styled.h1`
  font-size: 3.5rem;
`;

const Brand = styled.span`
  color: #fff;
`;

const Blog = styled.div`
  display: inline-flex;
  padding: 0.25rem 0.625rem;
  background-color: #fff;
  border-radius: 10px;
`;

const Content = styled.div`
  padding-top: 4rem;
`;

const Subtitle = styled.h2`
  margin-bottom: 1rem;
  padding: 0 var(--hor-padding);
  font-size: 2rem;
  text-align: center;
`;

const Nav = styled.nav`
  position: sticky;
  top: var(--header-height);
  margin-bottom: 2.5rem;
  border-bottom: 2px solid var(--border-clr);
  background-color: #fff;
  z-index: 1;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 1rem var(--hor-padding);
  column-gap: 1rem;
  overflow-x: auto;
  list-style: none;

  li {
    font-size: 1.25rem;
    font-weight: 500;
    white-space: nowrap;
  }

  a {
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  margin-bottom: 4rem;
  padding: 0 var(--hor-padding);
`;

const FIRST_PAGE_QUERY = gql`
  query {
    firstPageArticles {
      id
      author
      createdAt
      score
      updatedAt
      title
      text
      type
      url
    }
  }
`;

const NEXT_PAGE_QUERY = gql`
  query RetrievePageArticles($page: Int!) {
    retrievePageArticles(page: $page) {
      id
      author
      createdAt
      score
      updatedAt
      title
      text
      type
      url
    }
  }
`;

export const getServerSideProps = async () => {
  const {
    data: { firstPageArticles: articles },
  } = await client.query<{ firstPageArticles: Article[] }>({
    query: FIRST_PAGE_QUERY,
  });

  return {
    props: {
      // cut off last 4, because they are overlapping with paginated data
      articles: articles.slice(0, -4),
    },
  };
};

// variables to avoid redundant re-renders and increase performance
let isEnd = false;
let isExpanding = false;

const Home = ({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [page, setPage] = useState(0);
  const [loadNextPage, { data, fetchMore }] = useLazyQuery<{
    retrievePageArticles: Article[];
  }>(NEXT_PAGE_QUERY);

  const handleScroll = () => {
    const doc = document.documentElement;

    if (
      !isEnd &&
      !isExpanding &&
      doc.scrollTop + doc.clientHeight > doc.scrollHeight - SCROLL_GUTTER
    ) {
      const nextPage = page + 1;
      const loadFunc = nextPage === 1 ? loadNextPage : fetchMore;

      isExpanding = true;
      setPage(nextPage);

      loadFunc({
        variables: {
          page: page + 1,
        },
      })
        .then((response) => {
          if (response.data?.retrievePageArticles.length !== PAGE_SIZE) {
            isEnd = true;
          }
        })
        .finally(() => {
          isExpanding = false;
        });
    }
  };

  useGlobalEvent('scroll', handleScroll, [page]);

  return (
    <>
      <Header />
      <Main>
        <Cover>
          <Title>
            <Brand>Pocket MD</Brand> <Blog>Blog</Blog>
          </Title>
        </Cover>

        <Content>
          <Subtitle>Explore the latest news</Subtitle>
          <Nav>
            <List>
              <li>
                <Link href="/">Everyday Health</Link>
              </li>
              <li>
                <Link href="/">All</Link>
              </li>
              <li>
                <Link href="/">Hair</Link>
              </li>
              <li>
                <Link href="/">Lifestyle</Link>
              </li>
              <li>
                <Link href="/">Mental Health</Link>
              </li>
              <li>
                <Link href="/">Sex</Link>
              </li>
              <li>
                <Link href="/">Skin</Link>
              </li>
            </List>
          </Nav>

          <Grid>
            {[...articles, ...(data?.retrievePageArticles || [])].map(
              (article) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Post key={article.id} {...article} />
              ),
            )}
          </Grid>
        </Content>
      </Main>
      <Footer />
    </>
  );
};

export default Home;
