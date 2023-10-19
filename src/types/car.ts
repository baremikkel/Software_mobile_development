import { type DocumentData } from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { FIREBASE_STORAGE } from '../utils/firebase';

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  description?: string;
  available: boolean;
  price: number; // In DKK pr. day
  rating: number; // Float 0-5
  totalRatings: number;
  images: string[]; // Order matters
  fuel: Fuel;
  gear: Gear;
  seats: number;
  features?: Feature[];
};

enum Fuel {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  ELECTRIC = 'Electric'
}

enum Gear {
  MANUAL = 'Manual',
  AUTOMATIC = 'Automatic'
}

enum Feature {
  BLUETOOTH = 'Bluetooth',
  AIR_CONDITION = 'Air Condition',
  HEATED_SEATS = 'Heated Seats'
}

export async function mapCar(id: string, data: DocumentData): Promise<Car> {
  if (!isCarType(data)) {
    throw new Error('Data is not of car type');
  }

  isValidCar(data); // Validate car data

  return {
    id,
    make: data.make,
    model: data.model,
    year: data.year,
    description: data.description,
    available: data.available,
    price: data.price,
    rating: data.rating,
    totalRatings: data.totalRatings,
    images: await mapCarImages(id, data),
    fuel: data.fuel,
    gear: data.gear,
    seats: data.seats,
    features: data.features
  };
}

async function mapCarImages(id: string, data: Car): Promise<string[]> {
  const objects = await listAll(ref(FIREBASE_STORAGE, `cars/${id}`));
  const images = await Promise.all(
    objects.items.map(async (item) => await getDownloadURL(item))
  );

  const sortedImages = data.images.map(
    (image) => images.find((bucketImage) => bucketImage.includes(image)) // TODO: Verify images exist. This is a hack
  );
  return sortedImages.filter((image): image is string => image !== undefined);
}

function isCarType(data: any): data is Car {
  return (
    data.make !== undefined &&
    data.model !== undefined &&
    data.year !== undefined &&
    data.available !== undefined &&
    data.price !== undefined &&
    data.rating !== undefined &&
    data.totalRatings !== undefined &&
    data.images !== undefined &&
    data.fuel !== undefined &&
    data.gear !== undefined &&
    data.seats !== undefined
  );
}
function isValidCar(data: Car): void {
  if (data.rating < 0 || data.rating > 5) {
    throw new Error('Rating must be between 0 and 5');
  }

  if (!Number.isInteger(data.seats) || data.seats < 1) {
    throw new Error('Seats must be an integer and be greater than 0');
  }
}
