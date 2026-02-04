import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-pink-50 p-8 text-center">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-red-200 max-w-lg">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong 💔</h2>
                        <p className="text-gray-600 mb-4">Here is the error message to share with the developer:</p>
                        <pre className="bg-gray-100 p-4 rounded text-left overflow-auto text-sm text-red-600 font-mono">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
