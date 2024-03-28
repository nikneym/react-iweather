import { Navigate, useParams } from "react-router-dom";
import setTitle from "../../utils/set-title";

export default function Page() {
  // Receive the id from GET params and check if it's valid
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/" replace />;
  }

  const idAsInteger = Math.abs(parseInt(id!));
  if (isNaN(idAsInteger)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <button type="button" onClick={() => setTitle("Istanbul")}>
        set
      </button>
    </div>
  );
}
