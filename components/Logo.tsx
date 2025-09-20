import React from 'react';

const Logo: React.FC = () => {
    return (
        <a href="/" aria-label="Página Inicial da Fight Zone 017">
            <img 
                src="https://i.ibb.co/r2MKj6Y5/foto.jpg" 
                alt="Logo Fight Zone 017" 
                className="h-16 w-auto rounded-lg shadow-lg"
            />
        </a>
    );
};

export default Logo;
