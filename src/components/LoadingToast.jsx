import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const LoadingToast = ({ isLoading }) => {
  const toast = useToast();
  const toastId = 'loading-toast';

  useEffect(() => {
    if (isLoading) {
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          colorScheme: 'red',
          title: 'Cargando...',
          description: 'Por favor, espere mientras se carga la página.',
          status: 'loading',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } else {
      toast.close(toastId);
    }
  }, [isLoading, toast]);

  return null;
};

export default LoadingToast;