"use client";

import { AdvancedDateRangePicker } from "@/components/advanced-date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const Picker = () => {
  const [controlledDateRange, setControlledDateRange] = useState<
    DateRange | undefined
  >(undefined);

  console.log("external date", controlledDateRange);

  return (
    <>
      <AdvancedDateRangePicker
        value={controlledDateRange}
        onChange={setControlledDateRange}
      />
    </>
  );
};

export default Picker;
