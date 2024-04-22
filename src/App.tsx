import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import Routing from "Routing";
import useCustomQueryClient from "hooks/useCustomQueryClient";
import BlockSmallScreens from "components/_common/BlockSmallScreens";

function App() {
  const queryClient = useCustomQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="lg:hidden">
          <BlockSmallScreens />
        </div>
        <div className="hidden lg:block">
          <Routing />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
