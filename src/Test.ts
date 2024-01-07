import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, updateDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { Feature, Fuel, Gear } from '../src/types/car';
import { Alert } from 'react-native';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCidJT1lq5tWRcBlSTMCQkPAbGQBTgUf8A',
  authDomain: 'car-app-c512e.firebaseapp.com',
  projectId: 'car-app-c512e',
  storageBucket: 'car-app-c512e.appspot.com',
  messagingSenderId: '895079497353',
  appId: '1:895079497353:web:517179b4dcb2564c585058',
  measurementId: 'G-9RHDLRLJJC'
});

const firestore = getFirestore();

export async function updateAvailability(carId: string) {
  const currentCar = doc(firestore, 'cars/' + carId);
  const curCarSnap = await getDoc(currentCar);
  let unAvailable = true;
  console.log(curCarSnap.get('available'));

  if (curCarSnap.get('available')) {
    const docData = {
      available: false
    };
    unAvailable = true;
    await updateDoc(currentCar, docData);
  } else {
    const docData = {
      available: true
    };
    unAvailable = false;
    await updateDoc(currentCar, docData);
  }

  if (unAvailable) {
    Alert.alert('Car booked', 'The car has been booked', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ]);
  } else {
    Alert.alert('Car unbooked', 'The car has been unbooked', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ]);
  }
}

export async function getAllCars() {
  const carsSnap = await getDocs(collection(firestore, 'cars'));
  carsSnap.forEach((car) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(car.id, ' => ', car.data());
  });

  return carsSnap;
}

export function createCar() {
  const ran = Math.random();
  const newCar = doc(firestore, 'cars/' + ran * 100);
  const imageArr = [{}];

  const newCarData = {
    id: ran,
    make: 'ford',
    model: 'fiesta',
    year: 2000,
    description: 'Kæmpe bil lille pik',
    available: true,
    price: 100,
    rating: 5.0,
    totalRatings: 100000,
    images: imageArr,
    seats: 5,
    fuel: Fuel.PETROL,
    gear: Gear.MANUAL,
    features: Feature.AIR_CONDITION
  };
  setDoc(newCar, newCarData);
}
