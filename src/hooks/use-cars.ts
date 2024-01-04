import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { FIREBASE_APP, FIREBASE_DB } from '../utils/firebase';
import { type Car, mapCar } from '../types';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

type Props = {
  filters?: CarFilters;
};

type CarFilters = {
  make?: string;
};

type CarHookReturn = {
  data: Car[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const useCars = ({ filters }: Props): CarHookReturn => {
  const fetchCars = async (): Promise<Car[]> => {
    const dbFilters = [];
    if (filters?.make) {
      dbFilters.push(where('make', '==', filters.make));
    }

    const carsQuery = query(collection(FIREBASE_DB, 'cars'), ...dbFilters);
    const docs = await getDocs(carsQuery);
    const cars = await Promise.all(
      docs.docs.map(async (doc) => {
        try {
          return await mapCar(doc.id, doc.data());
        } catch (error) {
          console.error(error);
          return null;
        }
      })
    );

    return cars.filter((car): car is Car => car !== null);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cars', ...Object.values(filters ?? {})],
    queryFn: fetchCars
  });

  if (isError) console.error(error);

  return { data, isLoading, isError };
};
