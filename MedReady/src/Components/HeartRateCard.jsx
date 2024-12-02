import HeartRateGraph from "../Graphs/HeartRateGraph"

const HeartRateCard = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-md mb-4">
        <h3 className="text-xl font-semibold mb-2">Heart Rate Over Time</h3>
        <p className="text-sm font-thin">Here are some suggestions, saying whether you are healthy, or how you can improve</p>
        <HeartRateGraph />
    </div>
  )
}

export default HeartRateCard
