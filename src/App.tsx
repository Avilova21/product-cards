import React from 'react';
import { Box } from '@mui/material';
import { ProductsPage } from './pages/ProductsPage';
import { useInitToken } from './shared/hooks/useInitToken';

function App() {
  useInitToken()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <ProductsPage/>
    </Box>
  );
}

export default App;
