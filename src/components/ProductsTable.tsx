import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { SkeletonRows } from './SkeletonRows';
import React from 'react';
import { IProduct } from 'shared/types/productsTypes';

interface Props {
  isLoading: boolean;
  productsList: IProduct[]
}

export const ProductsTable = ({ isLoading, productsList}: Props) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600, maxWidth: 1200}}>
      <Box sx={{ height: '2px'}}>
        {isLoading && <LinearProgress />}
      </Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Brand</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? <SkeletonRows />
            : productsList?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.product}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.brand || null }</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}