import './loading-screen.css';

export function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Carregando">
      <div className="loading-spinner" aria-hidden="true" />
      <p className="loading-text">Carregando...</p>
    </div>
  );
}
