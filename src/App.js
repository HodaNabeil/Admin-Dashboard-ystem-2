
import { Routes ,Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Metrics from './Pages/Metrics';
import Events from './Pages/Events';
import EndPoints from './Pages/EndPoints';
import Vulnerabilities from './Pages/Vulnerabilities';



function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='metrics' element={<Metrics/>} />
        <Route path='events' element={<Events/>} />
        <Route path='endpoints' element={<EndPoints/>} />
        <Route path='vulnerabilities'  element={<Vulnerabilities/>} />
      </Routes>
    </div>
  );
}

export default App;
