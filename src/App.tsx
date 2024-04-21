import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import Routing from "Routing";
import useCustomQueryClient from "hooks/useCustomQueryClient";

function App() {
  const queryClient = useCustomQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routing />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
