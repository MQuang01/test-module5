import './App.css';
import Product from "./component/Product";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Edit from "./component/Edit";
import DetailsProduct from "./component/DetailsProduct";

function App() {
    return (
        // <Router>
        //     <div className="container">
        //         <Product></Product>
        //         <Edit></Edit>
        //     </div>
        // </Router>
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Product />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/product/:id" element={<DetailsProduct />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
