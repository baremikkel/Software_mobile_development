import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { Feature, Fuel, Gear } from '../src/types/car';



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

export async function updateAvailability() {
const currentCar = doc(firestore, 'cars/17.54566432578619');
const curCarSnap = await getDoc(currentCar);
console.log(curCarSnap);

const docData = {
    available: false,
  };
  updateDoc(currentCar, docData);
}

export function createCar() {
  const ran = Math.random();
  const newCar = doc(firestore, 'cars/' + ran * 100);
  const imageArr = [{}]

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
  }
  setDoc(newCar, newCarData);
}
