import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../../page/user/UserLayout/UserLayout";

const Wishlist = () => {
  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.auth.accountId);
  // useEffect(() => {
  //   if (accountId) {
  //     dispatch(FETCH_WISHLIST(accountId));
  //   }
  // }, [dispatch, accountId]);

  return (
    <UserLayout>
      <div className="text-center justify-center"></div>
    </UserLayout>
  );
};

export default Wishlist;
