import React from "react";
import { withAuth } from "../HOC";

function AuthenticationTest() {
  return (
    <div>
      <p>This page can be access by any logged in user</p>
    </div>
  );
}

export default withAuth(AuthenticationTest);
