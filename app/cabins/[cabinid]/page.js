import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { Suspense } from 'react';
import Cabin from '@/app/_components/Cabin';

// export const metadata = {
//   title: 'Cabin',
// };

export async function generateMetadata({ params }) {
  const { cabinid } = await params;
  const cabin = await getCabin(cabinid);

  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams({ params }) {
  const { cabinid } = await params;
  const cabins = await getCabins(cabinid);

  const ids = cabins.map((cabin) => ({ cabinid: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  const { cabinid } = await params;

  const cabin = await getCabin(cabinid);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div>
        <Cabin cabin={cabin} />
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve Cabin {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
