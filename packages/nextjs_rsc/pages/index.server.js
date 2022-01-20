import ToggleContent from '../components/toggle-content.client';
import Footer from '../components/footer.server';
import Skeleton from '../components/skeleton';
import { Suspense } from 'react';
import FetchedContent from '../components/fetched-content.server';

export default function Home() {
  return (
    <main>
      <h1>React server components</h1>
      <Suspense fallback={<Skeleton />}>
        <FetchedContent />
      </Suspense>
      <ToggleContent />
      <Footer />
    </main>
  )
}
