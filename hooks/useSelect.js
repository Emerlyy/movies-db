import { useState } from "react";

export const useSelect = (initialSortingType) => {
  const [sortingType, setSortingType] = useState(initialSortingType);

  const handleSortingTypeChange = (e) => {
    setSortingType(e.target.value);
  };

  return [sortingType, handleSortingTypeChange]
}