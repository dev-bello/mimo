import { CalendarIcon, ChevronLeftIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

export const VisitorHistorySection = (): JSX.Element => {
  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded bg-[#e0d0d0]"
          >
            <ChevronLeftIcon className="h-3 w-2.5 text-[#6e4a4a]" />
          </Button>

          <div className="relative flex h-[33px] w-40 items-center bg-[url(/rectangle-14.svg)] bg-[100%_100%]">
            <CalendarIcon className="absolute left-[9px] h-8 w-[26px]" />
            <div className="absolute left-4 mx-auto w-[134px] text-center [font-family:'Krona_One',Helvetica] text-[10px] font-normal text-[#6e4a4a]">
              JAN 1 - FEB 3
            </div>
          </div>
        </div>

        <div className="relative h-11 w-[241px]">
          <div className="flex h-full w-full items-center rounded-[10px] border-[3px] border-solid border-[#6e4a4a] bg-[#e0d0d0] px-5">
            <SearchIcon className="h-6 w-6 text-[#6e4a4a]" />
            <div className="ml-3 [font-family:'Krona_One',Helvetica] text-[10px] font-normal text-[#6e4a4a]">
              SearchIcon by Name
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
