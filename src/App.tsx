import Petals from "./components/Petals";
import Hero from "./components/Hero";
import CinematicStory from "./components/CinematicStory";
import Birthday from "./components/Birthday";
import Gallery from "./components/Gallery";
import LoveNote from "./components/LoveNote";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  return (
    <main className="relative bg-paper">
      <MusicPlayer />
      <Petals />
      <Hero />
      <CinematicStory />
      <Birthday />
      <Gallery />
      <LoveNote />
      <Footer />
    </main>
  );
}
