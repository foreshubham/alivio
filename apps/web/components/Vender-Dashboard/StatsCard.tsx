interface Props {
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick?: () => void;
}

const StatsCard = ({ title, value, icon, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-gray-200/60 rounded-lg p-5 transition ${
        onClick ? "cursor-pointer hover:shadow-sm" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">{title}</p>
          <p className="text-xl font-semibold mt-1">
            {value}
          </p>
        </div>
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
