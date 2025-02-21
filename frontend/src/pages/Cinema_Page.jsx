import Navbar from "../components/nav-bar"
import Footer from "../components/footer"
import ContentCinemaList from "../layouts/content-cinema-list"
function CinemaPage() {
    return (
        <>
            <Navbar></Navbar>
                <ContentCinemaList></ContentCinemaList>
            <Footer></Footer>
        </>
    )
}

export default CinemaPage