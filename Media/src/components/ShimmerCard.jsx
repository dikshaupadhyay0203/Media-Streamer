import ShimmerCard from "./ShimmerCard";

function Shimmer() {

  const arr = new Array(12).fill("");

  return (
    <div className="grid grid-cols-4 gap-6 p-5 ml-[200px] mt-[60px] bg-[#0f0f0f] min-h-screen">
      
      {arr.map((_, index) => (
        <ShimmerCard key={index} />
      ))}

    </div>
  );
}

export default Shimmer;
