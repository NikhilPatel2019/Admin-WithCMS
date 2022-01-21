import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Home from './components/Home';
import Header from './components/Header';
import AdminHome from './screens/AdminHome';
import DisplayAllModels from './screens/modelScreens/allModels';
import AddModel from './screens/modelScreens/addModel';
import Model from './screens/modelScreens/model';
import AddNewField from './screens/modelScreens/addNewField';
import ModelsForData from './screens/dataScreens/modelsForData';
import DisplayAllData from './screens/dataScreens/displayAllData';
import AddData from './screens/dataScreens/addData';
import EditData from './screens/dataScreens/editData';

function App() {
  return (
    <Router> 
    <Header />
    <main >
        <Routes>
          
          <Route path="/login" exact element={<LoginScreen />} /> 
          <Route path="/signup" exact element={<SignUpScreen />} /> 
          <Route path="/adminScreen" exact element={<AdminHome />} /> 

          <Route path="/models" exact element={<DisplayAllModels />} /> 
          <Route path="/models/:modelName" exact element={<Model />} /> 
          <Route path="/models/:modelName/addfield" exact element={<AddNewField />} /> 
          <Route path="/models/addNewModel" exact element={<AddModel />} /> 

          <Route path="/data" exact element={<ModelsForData />} /> 
          <Route path="/data/:modelName" exact element={<DisplayAllData />} /> 
          <Route path="/data/:modelName/addNewData" exact element={<AddData />} /> 
          <Route path="/data/editData/:modelName/:id" exact element={<EditData />} /> 
          
          <Route path="/" exact element={<Home />} /> 
       
        </Routes> 
    </main>
    </Router>
  );
}

export default App;
