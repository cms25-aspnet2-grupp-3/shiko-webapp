export default function VerifyCodePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] items-center justify-center ">
      <div className=" bg-white p-8 rounded-xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify your email
          </h1>
          <p className="text-sm text-gray-500">Enter your verification code.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="code" className="text-sm font-medium text-gray-700">
              Verification code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#ED5735]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#ED5735] py-2.5 font-semibold text-white hover:opacity-90"
          >
            Verify code
          </button>
        </form>
      </div>
    </div>
  );
}
