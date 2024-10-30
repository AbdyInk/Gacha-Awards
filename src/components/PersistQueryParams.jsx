import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PersistQueryParams = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = (event) => {
      const { pathname, search } = location;
      const params = new URLSearchParams(search);
      const newUrl = `${pathname}?${params.toString()}`;
      navigate(newUrl, { replace: true });
    };

    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [location, navigate]);

  return children;
};

export default PersistQueryParams;