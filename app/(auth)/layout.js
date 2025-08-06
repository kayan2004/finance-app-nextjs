import { sizes, variants } from "@/lib/variants";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import React from "react";

const Layout = ({ children }) => {
  return (
    <main>
      <div className="absolute left-8 top-8">
        <Link
          href="/"
          className={`${variants["ghost"]}  ${sizes["base"]} flex items-center space-x-2 text-sm`}
        >
          <ChevronLeft className="h-2 w-4" />
          <span>Back</span>
        </Link>
      </div>
      <div className="mt-8">{children}</div>
    </main>
  );
};

export default Layout;
