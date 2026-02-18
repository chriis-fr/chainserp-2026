import { InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';
import SEO from 'components/SEO';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Cta';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO url="/" />
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          {/* <Partners /> */}
          <BasicSection imageUrl="/demo-illustration-1.svg" title="Chains adapts to you." overTitle="The evolving software for modern businesses">
            <p>
            With scattered tools, Invoicing lives in one place. Accounting in another. Payments somewhere else. Reporting is manual. Growth means rebuilding everything.<span className='italic text-lg'> ~ that shouldn&apos;t be the case</span>
               {' '}
              <br />
              <br />
              {/* <Link href="/help-center">Possimus ullam velit rem itaque consectetur, in distinctio?</Link>  */}
              <span className='font-bold'>Chains</span> exists to replace fragmentation with a single, evolving system.
            </p>
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-2.svg" title="Designed to evolve." overTitle="Software should grow with you" reversed>
            <p>
            Chains is designed to evolve — horizontally across teams, and vertically across scale.{' '}
            <br />

            <strong>One platform for every stage </strong>.
            <br />
            </p>
            <ul>
              <li>You don't start as an Enterprise.</li>
              <li>You don't stay as a single entity.</li>
              <li>And you shouldn’t have to replace your software every time you grow.</li>
            </ul>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
          {/* <ScrollableBlogPosts posts={posts} /> */}
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
