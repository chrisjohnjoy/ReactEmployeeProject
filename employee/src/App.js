import Create from "./Component/Create";
import Crud from "./Component/Crud";


function App() {
  return (
    <div className="App">
      <h2 className='text-center'>CRUD OPERATIONS</h2>
      <Crud/>
      <Create/>
    </div>
  );
}

export default App;
