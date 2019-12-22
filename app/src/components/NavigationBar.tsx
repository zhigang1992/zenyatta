import React from "react";
import { Slot } from "react-slot-fill";
import Logo from "./Logo";

export const navigationBarItemSlot = "navigationBarItems";

const NavigationBar = () => {
  return (
    <div className="h-16 border-b border-gray-300 bg-gray-100">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Logo />
        <div className="flex-1" />
        <Slot name={navigationBarItemSlot} />
      </div>
    </div>
  );
};

export default NavigationBar;
