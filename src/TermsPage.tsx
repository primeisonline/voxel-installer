import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@heroui/react";

type TermsPageProps = {
  open?: boolean;   
  onClose?: () => void;
};

export default function TermsPage({ open = false, onClose }: TermsPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isRouteOpen = location.pathname === "/terms";
  const shouldRender = isRouteOpen || open;

  const handleClose = () => {
    if (isRouteOpen) navigate("/");
    else onClose?.();
  };

  useEffect(() => {
    if (!shouldRender) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRender, isRouteOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const blobs = document.querySelectorAll(".blob-dynamic");

    blobs.forEach((blob) => {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomDelay = Math.random() * 6;
      const randomSize = 420 + Math.random() * 520;

      const el = blob as HTMLElement;

      el.style.left = `${randomX}%`;
      el.style.top = `${randomY}%`;
      el.style.width = `${randomSize}px`;
      el.style.height = `${randomSize}px`;
      el.style.animationDelay = `${randomDelay}s`;
    });
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="blob-dynamic" />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/60" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/55 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-5 md:px-8 py-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Términos y Condiciones
              </span>
              <span className="text-white"> de Voxel Launcher</span>
            </h1>
            <div className="mt-1 text-sm text-white/45">
              Última actualización: 10 Marzo 2026
            </div>
          </div>

          <Button
            variant="light"
            onPress={handleClose}
            className="text-white/70 hover:text-white"
          >
            Volver
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 md:px-8 py-8 md:py-12">
        <p className="text-sm leading-relaxed text-white/70">
          Al descargar, instalar o utilizar{" "}
          <span className="text-red-500 font-semibold">Voxel Launcher</span>,
          aceptas automáticamente todos los términos y condiciones descritos en este documento.
          Si no estás de acuerdo con alguno de ellos, debes desinstalar la aplicación inmediatamente.
        </p>

        <Section title="1. Restricción de Distribución de Contenido">
          <p className="text-sm leading-relaxed text-white/70">
            Queda estrictamente prohibida la distribución, reproducción o compartición de los recursos descargados a través de la aplicación.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/70 space-y-1">
            <li>Imágenes</li>
            <li>Archivos multimedia</li>
            <li>Documentos y recursos internos</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Todos los recursos son propiedad de{" "}
            <span className="text-red-500 font-semibold">Voxel Launcher</span>{" "}
            o de sus respectivos titulares.
          </p>
        </Section>

        <Section title="2. Modificaciones en la Aplicación">
          <p className="text-sm leading-relaxed text-white/70">
            No está permitido realizar modificaciones, alteraciones, descompilaciones o ingeniería inversa de la aplicación.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/70 space-y-1">
            <li>Modificar su funcionalidad</li>
            <li>Cambiar su estructura interna</li>
            <li>Manipular sistemas de seguridad o verificación</li>
          </ul>
        </Section>

        <Section title="3. Exención de Responsabilidad">
          <p className="text-sm leading-relaxed text-white/70">
            Voxel Launcher se proporciona{" "}
            <span className="text-red-500 font-semibold">“tal cual”</span>. No nos hacemos responsables por:
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/70 space-y-1">
            <li>Errores del sistema o fallos técnicos</li>
            <li>Pérdida de datos</li>
            <li>Problemas derivados de terceros</li>
            <li>Daños directos o indirectos causados por el uso del launcher</li>
          </ul>
        </Section>

        <Section title="4. Uso Bajo Tu Propio Riesgo">
          <p className="text-sm leading-relaxed text-white/70">
            El uso del launcher es completamente bajo tu responsabilidad. Al instalarlo, aceptas que cualquier consecuencia derivada del uso será asumida por el usuario.
          </p>
        </Section>

        <Section title="5. Licencia y Advertencias de Seguridad">
          <p className="text-sm leading-relaxed text-white/70">
            Voxel Launcher no cuenta con firma digital de Windows ni certificado de editor verificado. Debido a esto, algunos sistemas de seguridad como Windows Defender u otros antivirus pueden mostrar advertencias o falsos positivos al momento de descargar o ejecutar la aplicación.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Esto no implica que el software contenga malware o código malicioso. El launcher se distribuye de manera independiente y su ejecución depende de la configuración de seguridad del usuario.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Al instalar Voxel Launcher, aceptas que entiendes esta situación y que decides ejecutarlo bajo tu propia responsabilidad.
          </p>
        </Section>

        <Section title="6. Aceptación Automática">
          <p className="text-sm leading-relaxed text-white/70">
            La instalación o uso continuo del launcher implica la aceptación total de estos términos y condiciones.
          </p>
        </Section>

        <Section title="7. Cambios en los Términos">
          <p className="text-sm leading-relaxed text-white/70">
            Voxel Launcher se reserva el derecho de modificar estos términos en cualquier momento sin previo aviso.
          </p>
        </Section>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/45">
          © 2026 Voxel Launcher. Todos los derechos reservados.
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-base md:text-lg font-bold text-red-500">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}