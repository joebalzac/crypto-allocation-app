import "./App.css";
import AssetInputs from "./components/CurrencyCalculator";

function App() {
  return (
    <section className="bg-[url('assets/hero-background.svg')] bg-cover bg-top h-screen flex  flex-col items-center p-5 pt-10 lg:pt-24 lg:pb-48">
      <div
        className="flex flex-col gap-6 text-left lg:text-center max-[w(
      770px
      )]:"
      >
        <h1 className="text-4xl font-extrabold leading-10">
          Allocate Your Crypto Investment
        </h1>
        <p className="text-xl text-body-gray pb-6 leading-7 font-normal max-w-[600px] mx-auto">
          Enter a USD amount and see it automatically split 70% into Bitcoin
          (BTC) and 30% into Ethereum (ETH).
        </p>
      </div>
      <AssetInputs />
    </section>
  );
}

export default App;
