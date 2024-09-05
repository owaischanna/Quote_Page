import React from 'react';
import Header from './Components/Header';
import Quote from './Components/QuoteForm';
import ImageSection from './Components/ImageSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
      <Quote/>
      <ImageSection/>
      </div>
    </div>
  );
}

export default App;
