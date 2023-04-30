import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { SortingType } from "types";

type ReturnType = [SortingType, (event: SelectChangeEvent<SortingType>) => void]

export const useSelect = (initialSortingType: SortingType): ReturnType => {
  const [sortingType, setSortingType] = useState(initialSortingType);

  const handleSortingTypeChange = (event: SelectChangeEvent<SortingType>) => {
    const target = event.target as { value: SortingType } | null;
    if (target) {
      const value: SortingType = target.value;
      setSortingType(value);
    }
  };

  return [sortingType, handleSortingTypeChange]
}