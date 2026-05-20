export default function FlamesDivider() {
  return (
    <div className="flex justify-center w-full py-0">
      <div
        className="w-[70%] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(204,18,0,0.6) 20%, #D4A017 50%, rgba(204,18,0,0.6) 80%, transparent 100%)',
        }}
      />
    </div>
  )
}
