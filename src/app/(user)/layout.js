
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function UserLayout({ children }) {
  return (
   <>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
        </>
     
  );
}
