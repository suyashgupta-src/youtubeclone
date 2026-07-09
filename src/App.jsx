
import Head from './components/Head';
import Body from './components/Body';
import { Provider } from 'react-redux';  
import store from './utils/store';  
import { BrowserRouter , Routes , Route } from 'react-router';
import WatchPage from './components/WatchPage'
import MainContainer from './components/MainContainer';
import SuggestionPage from './components/SuggestionPage';


function App() {
  
  return (
      <BrowserRouter>
        <Provider store={store}>  
      
          <div className="">
           <Head />
           <Routes>
              <Route path = "/" element = {<Body />} />
              <Route path = "/" element = {<MainContainer />} />
              <Route path = "watch" element = {<WatchPage />}/>
              <Route path="/search" element={<SuggestionPage />} />
           </Routes>
        </div>
       </Provider>
      </BrowserRouter>
    
  );
}

export default App;
