import getConfig from 'next/config';
import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

const { siteMetaData, basePath } = getConfig().publicRuntimeConfig;

const siteName = 'BrashBox'

interface Props {
  title?: string;
  children: ReactNode;
  image?: string;
  description?: string;
}

const Index = (props: Props) => {
  return (
    <>
      <article>
        <header>
          <Header title={siteName} />
        </header>
        <div className='pt-6'></div>
        <main className=''>
          <div className='container mx-auto'>
            {props.children}
          </div>
        </main>
        <footer>
          <Footer title={siteName} />
        </footer>
      </article>
    </>
  );
};

export default Index;
