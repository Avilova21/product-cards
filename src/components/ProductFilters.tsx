import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  debounce,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { productsService } from 'api/services/productsService';
import { removeDuplicates, sortCompare } from 'shared/utils/productsUtils';
import { EFilterField, TFilter, TFilterField } from 'shared/types/productsTypes';
import { useErrorCtx } from 'shared/context/ErrorContext';
import { TEXT_ERROR } from '../shared/constants/productConstants';

type TFilterState = Record<TFilterField, Array<string | number> | null>

const filterFields = Object.keys(EFilterField);

const initialFilterState: TFilterState = {
  [EFilterField.price]: null,
  [EFilterField.brand]: null,
  [EFilterField.product]: null
}

const defaultFilter = { field: '', value: ''}

interface Props {
  submitFilters: (data: TFilter) => void;
  initialFilter?: TFilter;
  resetCallback: () => void;
}

export const ProductFilters = ({ submitFilters, initialFilter = defaultFilter, resetCallback }: Props) => {
  const [filterData, setFiltersData] = useState<TFilterState>(initialFilterState);
  const [filter, setFilter] = useState<TFilter>(initialFilter);
  const { error, setError } = useErrorCtx();

  const handleChange = (event: SelectChangeEvent) => {
    const key = event.target.value
    setFilter({ field: key, value: ''})
  };

  useEffect(() => {
    const fetchFilterValues = async () => {
      try {
        for (const filterKey of filterFields) {
          if (filterKey === EFilterField.product) continue;
          const filterValue = await productsService.getFields(filterKey)
          const clearFilterValue = removeDuplicates(filterValue).sort(sortCompare);

          setFiltersData ((prevState) => ({
            ...prevState,
            [filterKey]: clearFilterValue
          }))
        }
      } catch (_) {
        setError(TEXT_ERROR.FETCH_FILTERS)

        await fetchFilterValues()
      }}

    fetchFilterValues()
  }, [])

  useEffect(() => {
    if (!filter?.field || !filter?.value) return;

    submitFilters(filter)
  }, [filter])

  const handleReset = () => {
    setFilter(defaultFilter)
    resetCallback();
  }

  const onChangeProductFilter = debounce((e) => {
      setFilter((prevState) => ({ ...prevState, value: e.target.value}))
    }, 500)

  return (

    <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px', height: '40px'}}>
      <Select
        sx={{minWidth: 120}}
        renderValue={() => filter?.field || ''}
        onChange={handleChange}
        disabled={!filter?.field || error}
      >
        {filterFields.map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </Select>
      {filter?.field === EFilterField.product ? (
        <OutlinedInput title='value' onChange={onChangeProductFilter} />
      ) : (
        <Select<number>
          maxRows={10}
          sx={{minWidth: 120}}
          renderValue={() => filter?.value || ''}
          onChange={(e) => {
            setFilter((prevState) => ({ ...prevState, value: e.target.value}))}
          }
          disabled={!filter?.field || error}

        >
          {filterData[filter.field]?.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      )}
      <Box display="flex" gap={1}>
        <Button onClick={handleReset} disabled={!filter?.field && !filter?.value}>Сбросить</Button>
      </Box>
    </Box>
  )
}