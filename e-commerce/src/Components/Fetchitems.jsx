import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from '../store/itemSlice';
import { fetchStatusActions } from '../store/fetchStatusSlice';
import { DEFAULT_ITEMS } from '../data/items';

const Fetchitems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());

    fetch("http://localhost:8080/items", { signal })
      .then((res) => {
        if (!res.ok) throw new Error("Backend response not ok");
        return res.json();
      })
      .then(({ items }) => {
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());

        const productList = Array.isArray(items[0])
          ? items[0]
          : Array.isArray(items)
          ? items
          : DEFAULT_ITEMS;

        dispatch(itemsActions.addInitialItems(productList));
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.warn("Could not fetch from backend, loading default items:", err);
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(itemsActions.addInitialItems(DEFAULT_ITEMS));
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus.fetchDone, dispatch]);

  return null;
};

export default Fetchitems;