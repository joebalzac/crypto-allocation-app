import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import useData from "../hooks/useData";
import LoadingSkeleton from "./LoadingSkeleton";

interface CoinbaseApiResponse {
  data: {
    currency: string;
    rates: {
      BTC: string;
      ETH: string;
    };
  };
}

interface ExchangeRateData {
  BTC: number;
  ETH: number;
}

const CurrencyCalculator = () => {
  const [amountUSD, setAmountUSD] = useState<number | null>(null);
  const [rates, setRates] = useState<ExchangeRateData | null>(null);

  const { data, loading, error } = useData<CoinbaseApiResponse>(
    "exchange-rates?currency=USD"
  );

  useEffect(() => {
    if (data) {
      const btcRate = parseFloat(data.data.rates.BTC);
      const ethRate = parseFloat(data.data.rates.ETH);
      setRates({
        BTC: btcRate,
        ETH: ethRate,
      });
      console.log("Rates:", btcRate, ethRate);
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setAmountUSD(null);
      return;
    }

    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      setAmountUSD(parsedValue);
    }
  };

  const handleReset = () => {
    setAmountUSD(null);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const btcAmount =
    rates && amountUSD !== null ? (amountUSD ?? 0) * 0.7 * rates.BTC : 0;
  const ethAmount =
    rates && amountUSD !== null ? (amountUSD ?? 0) * 0.3 * rates.ETH : 0;

  return (
    <div className="bg-white w-full max-w-lg px-4 bg rounded-lg shadow-sm">
      <Fieldset className="space-y-6 rounded-xl bg-white/5 p-4 sm:p-10">
        <Field className="relative">
          <Label className="text-sm font-medium text-gray-500">
            USD Amount
          </Label>
          <Input
            type="number"
            className="block w-full rounded-lg border bg-gray-100 mt-2 p-3 text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-justworks-blue"
            placeholder="Enter USD amount"
            onChange={handleInputChange}
            value={amountUSD ?? ""}
          />
        </Field>
        <Field>
          <Label className="text-sm font-medium text-gray-500">70% BTC</Label>
          <Input
            readOnly
            className="block w-full rounded-lg border bg-gray-100 mt-2 p-3 text-lg text-gray-700 focus:outline-none"
            value={btcAmount.toFixed(4)}
            placeholder="0.00"
          />
        </Field>

        <Field>
          <Label className="text-sm font-medium text-gray-500">30% ETH</Label>
          <Input
            readOnly
            className="block w-full rounded-lg border bg-gray-100 mt-2 p-3 text-lg text-gray-700 focus:outline-none"
            value={ethAmount.toFixed(4)}
            placeholder="0.00"
          />
        </Field>
        <div className="w-auto">
          <Button
            className="flex justify-center w-full lg:w-auto rounded-md bg-justworks-orange hover:bg-justworks-orange-dark border-justworks-orange text-white py-2 px-8 mt-4 text-md font-semibold focus:outline-none shadow-sm hover:shadow-lg"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
        <Legend className="text-center mt-4">
          <p className="text-sm text-gray-500 italic">
            * This calculator uses the latest Coinbase exchange rates.
          </p>
          <div className="flex justify-center items-baseline mt-4 gap-1">
            <p className="text-sm font-semibold">Powered by</p>
            <img
              className="h-3"
              src="public/assets/coinbase-logo.svg"
              alt="Coinbase Logo"
            />
          </div>
        </Legend>
      </Fieldset>
    </div>
  );
};

export default CurrencyCalculator;
