import Dashboard from "../../components/templates/Dashboard";
import Card from "../../components/atoms/Card.Dashboard";
import HeaderLiked from "../../components/organisms/member/product/like/HeaderLiked";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const user = useSelector((s) => s.user.data);
  return (
    <Dashboard>
      <Card>
        <HeaderLiked />
      </Card>
    </Dashboard>
  );
};
