import React from "react";

function Loader() {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
