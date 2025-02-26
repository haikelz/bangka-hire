export function OnMutateClient() {
  return (
    <div className="w-full fixed left-0 right-0 bottom-0 z-50 min-h-svh top-0 mx-auto flex backdrop-blur-md justify-center items-center">
      <div aria-modal="true" className="bg-white shadow-md rounded-md p-4">
        <span className="font-bold text-xl text-black">
          Sedang memproses....
        </span>
      </div>
    </div>
  );
}
