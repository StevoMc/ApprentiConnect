import { getReports } from "@/lib/actions/server-actions";
import Calendar from "@/components/calendar/Calendar";
import Tiptap from "@/components/editor/editor";
import 'components\\calendar\\styles.css';

const ReportsTable = async () => {
  const reports = await getReports();

  return (
    
      <div className="h-full w-full text-center font-medium">
        <Calendar showDetailsHandle={undefined} />
        <Tiptap />

      </div>

  );
};

export default ReportsTable;
