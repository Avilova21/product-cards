import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import { productsService } from 'api/services/productsService';
import { IProduct, TFilter } from 'shared/types/productsTypes';
import { ProductsTable, NoData, ProductsErrorPage, ProductFilters } from 'components';
import { LENGTH, TEXT_ERROR } from 'shared/constants/productConstants';
import { useErrorCtx } from 'shared/context/ErrorContext';

export const ProductsPage = () =>{
  const [productsList, setProductsList] = useState<IProduct[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { error, setError } = useErrorCtx();
  const [filter, setFilter] = useState<TFilter>()
  const [productIds, setProductIds] = useState<string[]>([])

  useEffect(() => {
    let isAborted = false;
    setIsLoading(true)

    if (!filter) {
      if (isAborted) return;
      productsService.getIds()
        .then((res) => {
          setProductIds(res as string[])
        }).catch(() => {
        setError(TEXT_ERROR.FETCH_FIELDS)
      })
    } else {
      if (isAborted) return;
      productsService.filter({ [filter.field]: filter.value}).then((res) => {
        setProductIds(res)
      }).catch(() => {
        if (isAborted) return;
        setError(TEXT_ERROR.FETCH_FIELDS)
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }, [filter])

  useEffect(() => {
    let isAborted = false;

    setIsLoading(true)

    const start = page > 1 ? LENGTH.LIMIT * (page - 1) : 0
    const ids = productIds.slice(start, LENGTH.LIMIT * page)

    productsService.getItems(ids).then((response) => {
      if (isAborted) return;
      setProductsList(response)
    }).catch(() => {
      if (isAborted) return;
      setError(TEXT_ERROR.FETCH_FIELDS)
    }).finally(() => {
      if (isAborted) return;
      setIsLoading(false)
    })

    return () => {
      isAborted = true;
    }
  }, [page, error, productIds])

  const handleChangePage = useCallback((_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }, [])

  const handleResetFilter = () => {
    setFilter(undefined)
  }

  const totalPages = useMemo(() => {
    return Math.ceil(productIds.length / LENGTH.LIMIT)
  }, [productIds?.length])

  return (
    <>
      <h2>Products</h2>
      <ProductFilters
        initialFilter={filter}
        submitFilters={(data) => setFilter(data)}
        resetCallback={handleResetFilter}
      />
      {error ? (
        <Box sx={{ marginTop: '20px'}}>
          <ProductsErrorPage textError={error} timerOutCallback={() => setError(null)} />
        </Box>
      ) : (
        <>
          {filter && !isLoading && !productIds.length ? (
            <NoData />
          ) : (
            <ProductsTable  isLoading={isLoading} productsList={productsList}/>
          )}
          {!isLoading && productsList?.length> 0 && (
            <Pagination sx={{ marginTop: '20px'}} disabled={isLoading} count={totalPages} page={page} onChange={handleChangePage}/>
          )}
        </>
      )}
    </>
  )
}