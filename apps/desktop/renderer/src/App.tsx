import React from 'react';
import { Timeline } from './components/Timeline';
import { Preview } from './components/Preview';
import { TrackList } from './components/TrackList';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>视频编辑器</h1>
      </header>
      
      <main className="app-main">
        <div className="preview-area">
          <Preview />
        </div>
        
        <div className="timeline-area">
          <TrackList />
          <Timeline />
        </div>
      </main>
    </div>
  );
}

export default App;
