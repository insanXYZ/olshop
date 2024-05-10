import Icon from "../../atoms/Icon";
import CardsTop from "../../moleculs/layout/CardsTop.Sidebar";
import CardsFooter from "../../moleculs/layout/CardsFooter.Sidebar";
import Sidebar from "../../atoms/Sidebar";

export default () => {
  return (
    <Sidebar className={"justify-between sticky top-0 left-0"}>
      <div className="flex flex-col gap-10">
        <Icon className={"text-5xl py-3"} />
        <CardsTop />
      </div>
      <div className="flex flex-col gap-10">
        <span className="w-full h-[2px] rounded-full bg-neutral"></span>
        <CardsFooter />
      </div>
    </Sidebar>
  );
};
