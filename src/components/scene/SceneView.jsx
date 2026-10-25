import Say from '../common/Say.jsx';
import ArtPanel from '../art/ArtPanel.jsx';
import ArtButton from '../art/ArtButton.jsx';

export default function SceneView({ master, onBackToCity }) {
  return (
    <div className="flex flex-col gap-3">
      <ArtPanel variant="parchment" className="flex flex-col gap-3 px-6 py-5">
        <div className="font-mono text-xs text-muted">{master.sceneLabel}</div>
        <Say name={master.name} portrait={master.portrait} lines={master.outro} />
        <ArtButton variant="primary" onClick={onBackToCity}>
          В город
        </ArtButton>
      </ArtPanel>
    </div>
  );
}
