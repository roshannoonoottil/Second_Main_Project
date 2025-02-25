import React from 'react';
import google_icon from '/icons8-google-48.png';

function GoogleAuth() {
  const handleGoogleRegister = () => {
    console.log('Google register clicked'); // Replace with actual Google sign-up logic
  };

  const styles = {
    button: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      background: '#333',
      color: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background 0.3s ease',
    } as React.CSSProperties, // Ensures TypeScript recognizes the styles
    buttonHover: {
      background: '#444',
    } as React.CSSProperties,
    icon: {
      width: '18px',
      height: '18px',
    } as React.CSSProperties,
  };

  return (
    <div>
      <button
        onClick={handleGoogleRegister}
        style={styles.button}
        onMouseEnter={(e) => (e.currentTarget.style.background = styles.buttonHover.background as string)}
        onMouseLeave={(e) => (e.currentTarget.style.background = styles.button.background as string)}
      >
        <img src={google_icon} alt="Google" style={styles.icon} />
        Continue with Google
      </button>
    </div>
  );
}

export default GoogleAuth;
