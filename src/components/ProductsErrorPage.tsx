import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ReactComponent as ErrorSVG } from 'assets/icons/errorIcon.svg';

interface Props {
  textError: string;
  timerOutCallback: () => void
}

export const ProductsErrorPage = ({textError, timerOutCallback }: Props) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds <= 1) {
        timerOutCallback()
      } else {
        setSeconds((prev) => prev - 1)
      }
    }, 1000)

    return () => {
      clearInterval(timer);
    }
  }, [seconds, timerOutCallback])

  return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    <ErrorSVG width={100} height={100} />

    <h2>Произошла ошибка</h2>
    <h3>{textError}</h3>
    <h3>Повторный запрос произойдёт через: {seconds}</h3>
  </Box>
}