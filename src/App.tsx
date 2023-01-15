import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ExchangeBox from "./Components/ExchangeBox";
import { API_KEY, BASE_URL } from "./Constants";

function App() {
  return (
    <ExchangeBox apiKey={API_KEY} baseUrl={BASE_URL}></ExchangeBox>
  );
}
export default App;
