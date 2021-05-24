import React, { useState } from 'react';
import './App.css';
import { Box, Divider } from '@material-ui/core';
import Counters from './components/counter/counters'
import NavBar from './components/NavBar/NavBar'
import Movie from './components/counter/movies/movie'

function App() {

  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  const handleIncrement = (counter) => {
    const newCounters = [...counters];
    const index = newCounters.indexOf(counter)
    newCounters[index] = { ...counter }
    newCounters[index].value++;
    setCounters(newCounters)
  }


  const handleDecrement = (counter) => {
    const newCounters = [...counters];
    const index = newCounters.indexOf(counter);
    newCounters[index] = { ...counter }
    newCounters[index].value--;
    setCounters(newCounters);
  }



  const handleDelete = (counterId) => {
    const filtered = counters.filter(c => c.id !== counterId)
    setCounters(filtered)
  }

  const handleReset = () => {
    const reset = counters.map(c => {
      console.log(c.value)
      c.value = 0;
      console.log(c.value)
      return c;
    });

    setCounters(reset);
  }




  return (
    <>
      <NavBar totalCounters={counters.filter(c => (c.value > 0) ? c : null).length} />
      <div>
        <div style={{ width: '100%' }}>
          <Counters
            counters={counters}
            onDelete={handleDelete}
            onReset={handleReset}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement} />
          <Box m={2} />
          <Divider />
          <Movie />
        </div>
      </div>
    </>
  );
}

export default App;
