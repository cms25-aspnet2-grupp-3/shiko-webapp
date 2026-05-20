export default function ChangePasswordPage() {
  return (
    <main className="px-6 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-[980px]">
        <section>
          <h1 className="text-[34px] font-semibold leading-[1.1] text-[#273142]">
            Settings
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-[14px] text-[#9AA3B2]">
            <button type="button" className="transition hover:text-[#273142]">
              General
            </button>
            <button type="button" className="transition hover:text-[#273142]">
              Team
            </button>
            <button
              type="button"
              className="rounded-[10px] bg-[#273142] px-6 py-2 text-[14px] font-medium text-white"
            >
              Password
            </button>
            <button type="button" className="transition hover:text-[#273142]">
              Notification
            </button>
          </div>
        </section>

        <section className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-[220px_1fr]">
          <div className="pt-3">
            <h2 className="text-[22px] font-semibold text-[#273142]">
              Password
            </h2>
            <p className="mt-2 max-w-[190px] text-[13px] leading-8 text-[#9AA3B2]">
              Please enter your current password to change your password.
            </p>
          </div>

          <div className="rounded-[20px] bg-white px-8 py-7 shadow-sm ring-1 ring-[#EEF2F6]">
            <h3 className="text-[22px] font-semibold text-[#273142]">
              Password
            </h3>
            <p className="mt-3 text-[13px] leading-7 text-[#9AA3B2]">
              Change password. Verification code will be sent to your email
              address.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-[14px] font-medium text-[#273142]"
                >
                  Current password*
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  defaultValue="123456789"
                  className="h-[44px] w-full rounded-[10px] border border-[#E8ECF2] bg-white px-4 text-[14px] text-[#273142] outline-none transition focus:border-[#F35B32]"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-[14px] font-medium text-[#273142]"
                >
                  New password*
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  defaultValue="123456789"
                  className="h-[44px] w-full rounded-[10px] border border-[#E8ECF2] bg-white px-4 text-[14px] text-[#273142] outline-none transition focus:border-[#F35B32]"
                />
                <p className="mt-2 text-[11px] leading-5 text-[#9AA3B2]">
                  Your new password must be more than 10 characters long and.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-[14px] font-medium text-[#273142]"
                >
                  Confirm new password*
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  defaultValue="123456789"
                  className="h-[44px] w-full rounded-[10px] border border-[#E8ECF2] bg-white px-4 text-[14px] text-[#273142] outline-none transition focus:border-[#F35B32]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  className="h-[40px] rounded-[10px] bg-[#F3F4F6] px-6 text-[13px] font-medium text-[#B0B7C3]"
                >
                  Back
                </button>

                <button
                  type="button"
                  className="h-[40px] rounded-[10px] bg-[#F35B32] px-7 text-[13px] font-medium text-white transition hover:bg-[#df4f29]"
                >
                  Save &amp; Next
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-[220px_1fr]">
          <div className="pt-3">
            <h2 className="text-[22px] font-semibold text-[#273142]">
              Login Activities
            </h2>
            <p className="mt-2 max-w-[190px] text-[13px] leading-7 text-[#9AA3B2]">
              See your login activities
            </p>
          </div>

          <div className="rounded-[20px] bg-white px-8 py-7 shadow-sm ring-1 ring-[#EEF2F6]">
            <h3 className="text-[22px] font-semibold text-[#273142]">
              Where you&apos;re logged in
            </h3>
            <p className="mt-3 max-w-[620px] text-[13px] leading-7 text-[#9AA3B2]">
              We&apos;ll alert you via hasan@gmail.com if there is any unusual
              activity in your account.
            </p>

            <div className="mt-7 space-y-0">
              <div className="flex items-start gap-3 border-b border-[#EEF2F6] py-5">
                <div className="mt-0.5 text-[16px] text-[#9AA3B2]">💻</div>
                <div>
                  <p className="text-[14px] font-medium text-[#273142]">
                    Mac - Stockholm, SE, Sweden
                  </p>
                  <p className="mt-1 text-[12px] text-[#9AA3B2]">
                    Chrome · <span className="text-[#F35B32]">Active Now</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b border-[#EEF2F6] py-5">
                <div className="mt-0.5 text-[16px] text-[#9AA3B2]">💻</div>
                <div>
                  <p className="text-[14px] font-medium text-[#273142]">
                    Mac - Uppsala, SE, Sweden
                  </p>
                  <p className="mt-1 text-[12px] text-[#9AA3B2]">
                    Chrome · Mar at 7:25 pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-5">
                <div className="mt-0.5 text-[16px] text-[#9AA3B2]">💻</div>
                <div>
                  <p className="text-[14px] font-medium text-[#273142]">
                    Mac - Stockholm, SE, Sweden
                  </p>
                  <p className="mt-1 text-[12px] text-[#9AA3B2]">
                    Chrome · Mar at 6:10 pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
