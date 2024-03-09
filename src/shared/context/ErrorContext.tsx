import { createContext, Dispatch, PropsWithChildren, useContext, useState } from 'react';

interface IErrorProvider extends PropsWithChildren {}
interface IErrorContext {
  error: any | null;
  setError: Dispatch<any>;
}

const initialError: IErrorContext = {
  error: '',
  setError: (_: string) => null
}

const ErrorContext = createContext(initialError);

export const ErrorContextProvider = ({ children }: IErrorProvider) => {
  const [error, setError] = useState<any>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useErrorCtx = () => useContext(ErrorContext);