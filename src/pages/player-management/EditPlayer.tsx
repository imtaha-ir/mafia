import { useParams } from "react-router-dom";

export default function EditPlayerPage() {
  const { id } = useParams();
  return <>Edit User {id}</>;
}
