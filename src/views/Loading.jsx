import { useTheme } from '@emotion/react';
import React, { useEffect } from 'react';

const LoadingSpinner = () => {

    const theme = useTheme();    

    const spinnerStyle = {
        display: 'inline-block',
        width: '50px',
        height: '50px',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderTopColor: theme.palette.primary.main,
        animation: 'spin 1s ease-in-out infinite',
    };

    const wrapperStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    useEffect(() => {
        // Check if there's an existing style sheet, otherwise create one
        let styleSheet = document.styleSheets[0];
        if (!styleSheet) {
        const styleEl = document.createElement("style");
        document.head.appendChild(styleEl);
        styleSheet = styleEl.sheet;
        }

        // Add the keyframes rule to the stylesheet
        const keyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        `;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }, []);

    return (
        <div style={wrapperStyle}>
        <div style={spinnerStyle} />
        </div>
    );
};

export default LoadingSpinner;
