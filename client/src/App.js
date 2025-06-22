
import { toast, ToastContainer } from "react-toastify";
function App(props) {
  return (
    <div className="App">
      {props.children}
      <ToastContainer />
    </div>
  );
}

export default App;
