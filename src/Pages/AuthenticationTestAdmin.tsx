import React from "react";
import { withAdminAuth } from "../HOC";

function AuthenticationTestAdmin() {
  return (
    <div>
      <p>This page can be access only if logged in user is Admin</p>
    </div>
  );
}

export default withAdminAuth(AuthenticationTestAdmin);
