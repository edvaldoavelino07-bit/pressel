import { useEffect, useState } from "react";
import profileImage from "@/assets/profile-image.png";

// ============================================
// 🔧 CONFIGURAÇÃO DOS LINKS DE REDIRECIONAMENTO
// Adicione ou remova links conforme necessário
// O sistema escolherá automaticamente de forma aleatória
// ============================================
const REDIRECT_LINKS = [
  "https://wa.me/5511960570738?text=oi%2C%20queria%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20aluguel%20de%20n%C3%BAmero", // Link WhatsApp 1 - Substitua pelo seu número
  ", // Link WhatsApp 2 - Substitua pelo seu número
  // Adicione mais links aqui...
];

// Tempo de espera antes de redirecionar (em milissegundos)
// 3000 = 3 segundos
const REDIRECT_DELAY = 3000;
// ============================================

const Index = () => {
  const [countdown, setCountdown] = useState(3);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Seleciona um link aleatório
    const randomIndex = Math.floor(Math.random() * REDIRECT_LINKS.length);
    const selectedLink = REDIRECT_LINKS[randomIndex];

    // Countdown visual
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redireciona após o delay
    const redirectTimeout = setTimeout(() => {
      setRedirecting(true);
      window.location.href = selectedLink;
    }, REDIRECT_DELAY);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, []);

  const handleManualRedirect = () => {
    const randomIndex = Math.floor(Math.random() * REDIRECT_LINKS.length);
    window.location.href = REDIRECT_LINKS[randomIndex];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
      <div className="flex flex-col items-center max-w-sm w-full">
        {/* Foto de Perfil Circular */}
        <div className="relative mb-6">
          <div className="w-40 h-40 rounded-full border-4 border-primary p-1 bg-card shadow-lg">
            <img
              src={profileImage}
              alt="Suporte Verificado"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-lg font-semibold text-center mb-6 text-foreground px-4">
          ENTRE EM CONTACTO COM UM DOS ATENDESTE
        </h1>

        {/* Botão Entrar */}
        <button
          onClick={handleManualRedirect}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg 
                     hover:opacity-90 transition-all duration-200 shadow-md mb-4"
        >
          {redirecting ? "Redirecionando..." : `Entrar ${countdown > 0 ? `(${countdown})` : ""}`}
        </button>

        {/* Texto Informativo */}
        <p className="text-sm text-muted-foreground text-center">
          {countdown > 0 
            ? `Você será redirecionado em ${countdown} segundos...`
            : "Redirecionando para o atendimento..."
          }
        </p>

        {/* Link Secundário */}
        <div className="mt-6 pt-4 border-t border-border w-full">
          <button
            onClick={handleManualRedirect}
            className="w-full py-3 rounded-xl border border-border bg-card text-foreground 
                       hover:bg-muted transition-all duration-200 text-sm"
          >
            Falar com atendente agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
