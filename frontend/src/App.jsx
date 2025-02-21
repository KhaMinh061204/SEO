import { Route, Routes, Navigate } from 'react-router-dom'
import './stylesheets/index.css'
import Index from './pages'
import SearchPage from './pages/searchPage'
import Loading from './components/loading'
import PopErr from './components/PopErr'
import PopSuc from './components/PopSuc'
import OrderFilm from './pages/order_film'
import Profile from './pages/profile'
import FilmList from './pages/fiml_list'
import ShowtimePage from './pages/ShowtimePage'
import SelectSeatsPage from './pages/SelectSeatsPage'
import CornPage from './pages/CornPage'
import PaymentPage from './pages/PaymentPage'
import CinemaPage from "./pages/Cinema_Page";
import PromotionPage from "./pages/Promotion_Page";
import PhimSapChieu from './components/film_sapchieu'
import PhimDangChieu from './components/film_dangchieu'
import AuthContent from "./layouts/auth-content";
import ScrollToTop from './components/ScrollToTop'

function App () {
  return (
    <>
      <Loading />
      <PopErr />
      <PopSuc />
      <AuthContent/>

      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/booking/:movieId' element={<ShowtimePage />} />
        <Route path='/movie/:movieId' element={<OrderFilm />} />
        <Route path='/selectseats/:roomId' element={<SelectSeatsPage />} />
        <Route path='/cornpage' element={<CornPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/order' element={<OrderFilm />} />
        <Route path='/profile/*' element={<Profile />} />
        <Route path='/filmlist/*' element={<FilmList />} />
        <Route path="/cinemalist/*" element ={<CinemaPage/>}/>
        <Route path="/promotion/*" element={<PromotionPage/>} />
        <Route path='/phimsapchieu' element={<PhimSapChieu />} />
        <Route path='/phimdangchieu' element={<PhimDangChieu />} />
        <Route path='/filmlist/*' element={<FilmList />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App
