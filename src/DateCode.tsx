import Image from "next/image";

interface P {
  date: string;
  code?: string;
}

const DateCode = ({ date, code }: P) => {
  const upperDate = date.toUpperCase();
  const str = !code ? upperDate : `${upperDate} - ${code}`;
  return (
    <div className="justify-left flex items-center gap-1 text-base">
      <Image
        width={16}
        height={16}
        className="inline"
        alt="->"
        src="/images/calendar.svg"
      />
      {str}
    </div>
  );
};
export default DateCode;
