//---------Routes
import MyRoutes from "./routes/MyRoutes";
//---------Redux
import {store} from "./redux/store";
import { Provider } from "react-redux";
//---------ToastContainer
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
         <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <Provider store={store}>
        <MyRoutes />
      </Provider>
    </div>
  );
}

export default App;
