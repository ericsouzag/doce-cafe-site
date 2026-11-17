import { Contato } from "./components/Contato";
import { Destaques } from "./components/Destaques";
import { Essencia } from "./components/Essencia";
import { Experiencia } from "./components/Experiencia";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProvaSocial } from "./components/ProvaSocial";
import { Universo } from "./components/Universo";
import { VisiteNos } from "./components/VisiteNos";

function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-creme focus:px-4 focus:py-2 focus:text-cafe"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Essencia />
        <Universo />
        <Experiencia />
        <Destaques />
        <ProvaSocial />
        <VisiteNos />
        <Contato />
      </main>

      <Footer />
    </>
  );
}

export default App;
