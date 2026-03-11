import { useRef, useEffect } from "react";
import { Download, Check, Monitor} from "lucide-react";
import { Button, Card, CardBody } from "@heroui/react";
import previewImg from "../images/launcher-preview.png";
import { useNavigate } from "react-router-dom";

function App() {
  
  const imageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const navigate = useNavigate();

  const windowsUrl = `https://cdn.stackedhost.crysistudio.xyz/voxel-launcher/release/latest/voxel-launcher-setup.exe`;

  const handleWindowsDownload = () => {
    window.location.href = windowsUrl;
  };

  useEffect(() => {
    const blobs = document.querySelectorAll(".blob-dynamic");

    blobs.forEach((blob) => {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomDelay = Math.random() * 6;
      const randomSize = 400 + Math.random() * 400;

      const el = blob as HTMLElement;

      el.style.left = `${randomX}%`;
      el.style.top = `${randomY}%`;
      el.style.width = `${randomSize}px`;
      el.style.height = `${randomSize}px`;
      el.style.animationDelay = `${randomDelay}s`;
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = imageRef.current;
    if (!card) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 12;
      const rotateX = (0.5 - y) * 12;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
      `;
    });
  };

  const handleMouseLeave = () => {
    const card = imageRef.current;
    if (!card) return;

    card.style.transition = "transform 0.15s ease-out";
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

    setTimeout(() => {
      if (card) {
        card.style.transition = "transform 0.06s linear";
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="blob-dynamic" />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>

      <div className="relative z-10">
        <main className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">

          <div className="max-w-4xl w-full text-center space-y-10">

            <div className="inline-block">
              <span className="px-4 py-1.5 bg-red-600/20 border border-red-600/50 text-red-500 text-xs font-medium tracking-wider rounded-[8px]">
                VERSIÓN 2.1.0 STABLE
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                Voxel<span className="text-red-600"> Launcher</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Instalación rápida y sencilla. Optimización de rendimiento integrada,
                interfaz moderna y actualizaciones automáticas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">

              <Button
                onPress={handleWindowsDownload}
                radius="sm"
                className="!rounded-[8px] group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 w-full sm:w-auto"
              >
                <Monitor className="w-5 h-5" />
                <span>Descargar para Windows</span>
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </div>

            <div className="mt-16 border-t border-zinc-800 pt-10">
              <Card
                isPressable
                radius="sm"
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="!rounded-[8px] overflow-hidden border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm shadow-2xl shadow-red-600/10 hover:border-red-600/40 will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.06s linear"
                }}
              >
                <CardBody className="p-0">
                  <img
                    src={previewImg}
                    alt="Voxel Launcher Preview"
                    className="w-full h-[400px] md:h-[515px] object-cover pointer-events-none select-none"
                  />
                </CardBody>
              </Card>
            </div>

            <div className="mt-16 border-t border-zinc-800 pt-10">
              <div className="grid md:grid-cols-3 gap-4">

                {[
                  "Instalación Simple",
                  "Voxel Launcher",
                  "Actualizaciones Automáticas"
                ].map((title, i) => (
                  <Card
                    key={i}
                    isPressable
                    radius="sm"
                    className="!rounded-[8px] p-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-red-600/40 transition-all duration-300"
                  >
                    <CardBody className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-red-600/20 flex items-center justify-center mb-3 rounded-[8px]">
                        <Check className="w-5 h-5 text-red-500" />
                      </div>
                      <h3 className="font-semibold mb-2">{title}</h3>
                      <p className="text-sm text-gray-400">
                        {i === 0 && "Un clic y listo. Sin configuraciones complejas."}
                        {i === 1 && "Usa Voxel Launcher para participar en los eventos."}
                        {i === 2 && "Siempre tendrás la última versión disponible."}
                      </p>
                    </CardBody>
                  </Card>
                ))}

              </div>

              <div className="text-sm text-gray-500 space-x-3 mt-10">
                <a
                  href="https://twitter.com/primeisonline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors"
                >
                  @primeisonline
                </a>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => navigate("/terms")}
                  className="underline underline-offset-4 hover:text-[#4850ec] transition-colors"
                >
                  términos y condiciones
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
