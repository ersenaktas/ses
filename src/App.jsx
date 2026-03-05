import Header from './components/Header';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Header />
      <main>
        <Stage1 />
        <Stage2 />
        <Stage3 />
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground bg-background border-t border-border">
        <p>&copy; {new Date().getFullYear()} Edebiyat Eğitiminde Şiir Dili Modülü. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}

export default App

