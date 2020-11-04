import React from 'react';
import Header from './ui/Header';

function App() {
  return (
    <div>
      <Header />
      {[...new Array(50)]
        .map(
          () =>
            `Sadipscing sadipscing vero justo dolor ipsum est stet clita ea voluptua, voluptua et dolor amet justo consetetur dolor diam sit. Amet sed sit sed accusam sed, amet takimata amet tempor accusam, dolore amet est ea erat, vero ipsum erat stet sed rebum et accusam dolore sed. Takimata labore tempor rebum.`
        )
        .join('\n')}
    </div>
  );
}

export default App;
