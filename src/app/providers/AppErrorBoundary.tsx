import { Component, type ErrorInfo, type ReactNode } from "react";
import { FeedbackPanel } from "@/shared/ui/FeedbackPanel";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled frontend error", {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-100 px-6 py-16">
          <div className="mx-auto max-w-xl">
            <FeedbackPanel
              variant="error"
              title="Ocurrio un error inesperado"
              description="La aplicacion encontro un problema y no pudo continuar. Recarga la pagina para intentarlo nuevamente."
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
