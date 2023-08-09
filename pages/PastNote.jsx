import React, { useEffect } from "react";
import { UserContext } from "./_app";
import { userTypes } from "../constants/userTypes";
import { useRouter } from "next/router";

function PastNotes() {
  const { user } = React.useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (
      !user.type.trim() ||
      !(user.type == userTypes.FACULTY || user.type == userTypes.PRINCIPAL)
    ) {
      router.push("/");
    }
    router.push("/PastNotification");
  }, [user]);

  return <div>PastNotes</div>;
}

export default PastNotes;
