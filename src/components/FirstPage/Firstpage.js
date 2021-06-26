import React from 'react';
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import AboutProject from '../AboutProject/AboutProject'
import TitlePage from '../TitlePage/TitlePage'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'
import Footer from '../Footer/Footer'

function FirstPage() {

  return (
    <div className="firstPage">
            <Header />
            <TitlePage/>
            <NavBar />
            <AboutProject />
            <Techs/>
            <AboutMe/>
            <Portfolio/>
            <Footer/>
    </div>
  );
}

export default FirstPage;