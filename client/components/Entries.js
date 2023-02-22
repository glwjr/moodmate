import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "../store";
import EntryForm from "./EntryForm";

export default function Entries() {
  const dispatch = useDispatch();
  const { entries } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  return (
    <>
      <pre>
        {JSON.stringify(entries, null, 2)}
      </pre>
      <EntryForm />
    </>
  )
}
