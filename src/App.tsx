import MainLayout from "./layouts/MainLayout";
import useAuthCheck from "./hooks/authChecke";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
