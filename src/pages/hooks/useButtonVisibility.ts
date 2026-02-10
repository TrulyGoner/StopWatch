import { useState } from "react";

export const useButtonVisibility = () => {
  const [isShowStart, setIsShowStart] = useState(false);
  const [isShowPauseAndClear, setIsShowPauseAndClear] = useState(false);
  const [isShowResumeAndClear, setIsShowResumeAndClear] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(true);

  return [
    [isShowStart, setIsShowStart],
    [isShowPauseAndClear, setIsShowPauseAndClear],
    [isShowResumeAndClear, setIsShowResumeAndClear],
    [isShowDelete, setIsShowDelete],
  ] as const;
};

