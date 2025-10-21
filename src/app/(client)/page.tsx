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
