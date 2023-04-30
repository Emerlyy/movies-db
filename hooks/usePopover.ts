import { useState } from "react";


export type UsePopoverReturnType = [HTMLElement | null, boolean, (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void, () => void]

export const usePopover = (): UsePopoverReturnType => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return [anchorEl, open, handlePopoverOpen, handlePopoverClose];
}