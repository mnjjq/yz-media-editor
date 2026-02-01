import React from 'react';

export function Preview() {
  return (
    <div className="preview">
      <canvas className="preview-canvas" />
      <div className="preview-controls">
        <button>播放</button>
        <button>暂停</button>
      </div>
    </div>
  );
}
