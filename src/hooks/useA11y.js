import { useContext } from 'react';
import { A11yContext } from '../app/context/A11yContext';

export const useA11y = () => {
  const context = useContext(A11yContext);
  if (!context) {
    throw new Error('useA11y must be used within an A11yProvider');
  }
  return context;
};