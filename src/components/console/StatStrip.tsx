interface StatStripProps {
  alertCount: number;
  certCount: number;
}

export default function StatStrip({ alertCount, certCount }: StatStripProps) {
  return (
    <div className="mb-[22px] grid grid-cols-2 gap-3.5 sm:grid-cols-4">
      <div className="rounded-[12px] border border-line bg-white px-[17px] py-[15px]">
        <div className="text-[26px] font-semibold leading-none">5</div>
        <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.4px] text-grey">
          Active loads
        </div>
      </div>
      <div className="rounded-[12px] border border-line bg-white px-[17px] py-[15px]">
        <div className="text-[26px] font-semibold leading-none text-danger">
          {alertCount}
        </div>
        <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.4px] text-grey">
          Excursion alerts
        </div>
      </div>
      <div className="rounded-[12px] border border-line bg-white px-[17px] py-[15px]">
        <div className="text-[26px] font-semibold leading-none text-ok">
          {certCount}
        </div>
        <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.4px] text-grey">
          Certified today
        </div>
      </div>
      <div className="rounded-[12px] border border-line bg-white px-[17px] py-[15px]">
        <div className="text-[26px] font-semibold leading-none">70%</div>
        <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.4px] text-grey">
          Less audit labor
        </div>
      </div>
    </div>
  );
}
