import './loading-screen.css';

export function LoadingScreen() {
  return (
    <div className="loading-wrap" role="status" aria-label="Carregando categorias">
      <div className="loading-ring-wrap" aria-hidden="true">
        <div className="loading-ring-core" />
      </div>
      <p className="loading-text">Carregando lista de mercado</p>
      <p className="loading-sub">Organizando suas categorias...</p>
    </div>
  );
}
