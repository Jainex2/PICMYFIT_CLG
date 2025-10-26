import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 flex items-center justify-center py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 premium-gradient rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-coffee-900 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-lg text-coffee-700 mb-6 max-w-xl mx-auto leading-relaxed">
                We encountered an unexpected error. Don't worry, our team has been notified and we're working to fix it.
              </p>
              
              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="premium-card rounded-2xl p-6 mb-8 text-left">
                  <h3 className="text-lg font-semibold text-coffee-900 mb-4">Error Details:</h3>
                  <pre className="text-sm text-red-600 overflow-auto bg-red-50 p-4 rounded-lg">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={this.handleReload}
                className="luxury-button text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="border border-luxury-400 text-luxury-600 px-6 py-3 rounded-xl hover:bg-luxury-50 transition-all duration-300 font-semibold flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </button>
            </div>

            {/* Help Text */}
            <div className="premium-card rounded-2xl p-6">
              <p className="text-coffee-600 text-sm leading-relaxed">
                If this problem persists, please contact our support team at{' '}
                <a href="mailto:picmyfit@gmail.com" className="text-luxury-600 hover:text-luxury-500 font-medium">
                  picmyfit@gmail.com
                </a>{' '}
                and include details about what you were doing when this error occurred.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;