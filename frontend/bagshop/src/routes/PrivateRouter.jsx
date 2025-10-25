import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { Spin } from "antd";
import { selectIsAuthenticated, selectAccountId } from "../redux/slices/AuthSlice";
import { FETCH_ACCOUNT } from "../redux/slices/AccountSlice";
import { selectAccount, selectAccountLoading } from "../redux/slices/AccountSlice";

const PrivateRoute = ({ requiredPosition }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accountId = useSelector(selectAccountId);
  const account = useSelector(selectAccount);
  const loadingAccount = useSelector(selectAccountLoading);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const checkUserAccess = async () => {
      if (!isAuthenticated || !accountId) {
        if (mounted) setIsChecking(false);
        return;
      }
      if (account && account.id === accountId) {
        if (mounted) setIsChecking(false);
        return;
      }
      try {
        await dispatch(FETCH_ACCOUNT(accountId)).unwrap();
      } catch (err) {
        console.error("Failed to fetch account:", err);
      } finally {
        if (mounted) setIsChecking(false);
      }
    };
    checkUserAccess();
    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuthenticated, accountId]);

  if (isChecking || loadingAccount) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated || !accountId) {
    return <Navigate to="/" replace />;
  }

  if (!account) {
    return <Navigate to="/" replace />;
  }

  if (requiredPosition && account.position !== requiredPosition) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
