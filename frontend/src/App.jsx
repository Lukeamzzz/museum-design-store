import { Box, Divider, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';


function App() {
  return (
    <Box minH={"100vh"}>
      <NavBar/> {/* NavBar component is above the routes so that it can always be seen, regardless of the page you are */}
      <Divider maxW={'100vw'} borderWidth={'1px'} borderColor={useColorModeValue('black', 'white')} opacity={'0.9'}/> {/* This is the line dividing the navbar from everything else*/}
      <Routes>
        <Route path="" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
      </Routes>
      <Footer/>
    </Box>
  );
}

export default App;