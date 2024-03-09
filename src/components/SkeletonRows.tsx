import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

interface Props {
  countRows?: number
}

export const SkeletonRows = ({countRows = 4}: Props ) => (
  <>
    {Array(countRows).fill('').map((_, idx) => (
      <TableRow key={idx}>
        <TableCell><Skeleton variant="rectangular" width={358} height={20}/></TableCell>
        <TableCell><Skeleton variant="rectangular" width={540} height={20}/></TableCell>
        <TableCell><Skeleton variant="rectangular" width={70} height={20}/></TableCell>
        <TableCell><Skeleton variant="rectangular" width={102} height={20}/></TableCell>
      </TableRow>
    ))}
  </>
)
