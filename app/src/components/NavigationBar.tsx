import React from "react";
import { Slot } from "react-slot-fill";

export const navigationBarItemSlot = "navigationBarItems";

const NavigationBar = () => {
  return (
    <div className="h-16 border-b border-gray-300 bg-gray-100">
      <div className="container mx-auto h-full flex items-center justify-between">
        <div>Logo</div>
        <div>
          <Slot name={navigationBarItemSlot} />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
