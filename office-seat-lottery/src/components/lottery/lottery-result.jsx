export function LotteryResult({ result }) {
  if (!result) return null

  return (
    <div className="mt-6 p-4 bg-muted rounded-lg text-center">
      <p className="font-bold text-xl">{result}</p>
    </div>
  )
}