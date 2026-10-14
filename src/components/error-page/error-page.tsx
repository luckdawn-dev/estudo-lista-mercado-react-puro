import './error-page.css';

export function ErrorPage() {
  return (
    <div className="error-page" role="alert" aria-label="Página não encontrada">
      <div className="error-illustration" aria-hidden="true" />
      <h1 className="error-title">Página não encontrada</h1>
      <p className="error-sub">
        Parece que você se perdeu no mercadinho. A página que procura não existe ou foi removida.
      </p>
      <a href="/" className="error-btn">Voltar para o início</a>
    </div>
  );
}
