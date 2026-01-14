import { Component } from "react";
import GlobalError from "../utils/GlobalError";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log to console (can be extended to error tracking service)
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                    <GlobalError
                        title="Something went wrong"
                        message="An unexpected error occurred. Please try again."
                        onRetry={this.handleRetry}
                    />
                </div>
            );
        }

        return this.props.children;
    }
}
