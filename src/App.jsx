import './App.css';
import Table from './components/Table';
import fetchContext from './context/fetchContext';
import useFetch from './hooks/tableFetch';

function App() {
  return (
    <fetchContext.Provider value={ useFetch() }>
      <Table />
    </fetchContext.Provider>
  );
}

export default App;
