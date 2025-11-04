import { getCategories } from '@/sanity/queries';
import Container from '@/components/Container';
import HomeBanner from '@/components/HomeBanner';
import ProductTab from '@/components/ProductTab';
import HomeCategories from '@/components/HomeCategories';
import ShopByBrands from '@/components/shopByBrands';
import LatestBlogs from '@/components/LatestBlogs';

const Home = async () => {
  const categories = await getCategories(6);

  console.log('Categories on Home Page:', categories);

  return (
    <div>
      <Container>
      <div>
        <title>Home - MassDropp | Online Ecommerce Platform</title>
        <meta name="description" content="Get in touch with MassDropp. We're here to help with any questions about our products, services, or your shopping experience." />
        <link rel="icon" href="/favicon.ico" />
      </div>
        <HomeBanner />
        <div className='py-10'>
          <ProductTab/>
          <HomeCategories categories={categories}/>
          <ShopByBrands/>
          <LatestBlogs/>
        </div>
      </Container>
    </div>
  );
};

export default Home;
