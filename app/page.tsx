import Header from './components/Header';
import Hero from './components/Hero';
import PurchaseCard from './components/PurchaseCard';
import HowItWorks from './components/HowItWorks';
import RecentWinners from './components/RecentWinners';
import PreviousDraws from './components/PreviousDraws';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className=''>
      <Header />
      <Hero />    
      <PurchaseCard />
      <HowItWorks />
      <RecentWinners />
      <PreviousDraws />
      <Footer />
    </div>
  );
}
