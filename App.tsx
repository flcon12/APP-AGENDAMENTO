
import React from 'react';
import Header from './components/Header';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
            <Header />
            <main className="px-4 py-8 md:py-16">
                <BookingSection />
            </main>
            <Footer />
        </div>
    );
};

export default App;