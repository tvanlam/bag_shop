import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { selectIsAuthenticated, selectAccountId } from '../redux/slices/AuthSlice';
import { FETCH_ACCOUNT } from '../redux/slices/AccountSlice';

const PrivateRoute = ({ requiredPosition }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accountId = useSelector(selectAccountId);
  const { account, loading } = useSelector((state) => state.account);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUserAccess = async () => {
      if (!isAuthenticated || !accountId) {
        setIsChecking(false);
        return;
      }

      // If we don't have account details or the account ID doesn't match, fetch account details
      if (!account || account.id !== accountId) {
        try {
          await dispatch(FETCH_ACCOUNT(accountId)).unwrap();
        } catch (error) {
          console.error('Failed to fetch account details:', error);
        }
      }
      
      setIsChecking(false);
    };

    checkUserAccess();
  }, [dispatch, isAuthenticated, accountId, account]);

  // Show loading spinner while checking authentication and fetching account details
  if (isChecking || loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  // If not authenticated, redirect to home page
  if (!isAuthenticated || !accountId) {
    return <Navigate to="/" replace />;
  }

  // If account details are not available, redirect to home page
  if (!account) {
    return <Navigate to="/" replace />;
  }

  // If a specific position is required, check if user has that position
  if (requiredPosition && account.position !== requiredPosition) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the protected route
  return <Outlet />;
};

export default PrivateRoute;
