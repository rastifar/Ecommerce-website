import MyRoutes from "./routes/MyRoutes";
import {store} from "./redux/store";
import { Provider } from "react-redux";
import {  ToastContainer } from "react-toastify";

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
