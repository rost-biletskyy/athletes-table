import athletes from './data/athletes.json';

export default function App() {
  return <pre>{JSON.stringify(athletes, null, 2)}</pre>;
}