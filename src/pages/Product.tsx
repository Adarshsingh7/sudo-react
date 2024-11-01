import RichTable from "@/components/RichTable";
import { FC } from "react";

const Product: FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <RichTable />
      <RichTable />
    </div>
  );
};

export default Product;
