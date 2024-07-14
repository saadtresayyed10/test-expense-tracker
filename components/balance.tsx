import getUserBalance from "@/app/actions/getUserBalance";
import { addCommas } from "@/app/actions/utils";

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <>
      <h4>Balance</h4>
      <h1>₹{addCommas(Number(balance?.toFixed(2)) ?? 0)}</h1>
    </>
  );
};

export default Balance;
