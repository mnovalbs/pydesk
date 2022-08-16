import { FormEventHandler, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import api from './api';
import './App.css';

const Home = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [result, setResult] = useState<number | null>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { data } = await api({
      method: 'POST',
      url: '/sum',
      data: {
        a,
        b,
      },
    });

    setResult(data.result);
  };

  return (
    <div>
      <h2>Sum Operator</h2>
      <h5>From python server: http://127.0.0.1:5000/sum</h5>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value || ''))}
          />{' '}
          +{' '}
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value || ''))}
          />
        </div>
        <button type="submit">Calculate!</button>
      </form>

      <h5>Result: {result}</h5>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
