import { getWindowSize } from 'hooks/useWindowSize';
import Layout from './base-layout'
import { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
}

const Index = ({ children, title }: Props) => {
  const { width } = getWindowSize();
  return (
    <Layout>
      <div>
        <div className='mx-auto'>
          <div className='justify-center text-center'>
            <div className='p-6 text-7xl flex justify-center'></div>
            <h1 className='text-3xl font-semibold' style={{ color: '#24292f' }}>
              {title}
            </h1>
            <div className='m-6'></div>
            <div className='m-6'></div>
            <div className='m-6'></div>
          </div>
          <div className='m-8'></div>
          <div className='
            flex
            grid 
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-5
            lg:grid-cols-9
            xl:grid-cols-9
            gap-5
            justify-end
            '>
            <div className='
              lg:col-span-2
              xl:col-span-2
              lg:visible
              xl:visible
              invisible
              flex
              lg:h-full
              xl:h-full
              h-0
            '>
            </div>
            <div className='
              grid-cols-1
              md:col-span-5
              lg:col-span-5
              xl:col-span-5'>
              <article className='rounded-lg p-6 gap-4 shadow'>
                <section className=''>
                  {children}
                </section>
              </article>
              <div className='pt-6'></div>
            </div>
            <div className='
              lg:col-span-2
              xl:col-span-2
              lg:visible
              xl:visible
              invisible
              flex
              lg:h-full
              xl:h-full
              h-0
            '>
            </div>
          </div>
          <div className='p-6'></div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;