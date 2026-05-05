import Image from "next/image";
import logoHeader from "@/app/assets/logo-header.png";
import signInSide from "@/app/assets/sign-in-side.png";
import microsoftIcon from "@/app/assets/microsofticon.png";

type BrandLogoProps = {
  width?: number;
  className?: string;
};

function BrandLogo({ width = 140, className = "" }: BrandLogoProps) {
  const baseWidth = 204.29;
  const baseHeight = 50;
  const scale = width / baseWidth;
  const height = baseHeight * scale;

  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
      aria-label="Shiko logo"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#FFFFFF",
          WebkitMaskImage: `url(${logoHeader.src})`,
          maskImage: `url(${logoHeader.src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "left center",
          maskPosition: "left center",
        }}
      />

      <span
        className="absolute bg-[#F35B32]"
        style={{
          left: 14 * scale,
          top: 18 * scale,
          width: 7 * scale,
          height: 7 * scale,
          borderRadius: 1.5 * scale,
        }}
      />

      <span
        className="absolute rounded-full bg-[#F35B32]"
        style={{
          left: 136 * scale,
          top: 5 * scale,
          width: 10 * scale,
          height: 10 * scale,
        }}
      />
    </div>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-4 md:p-8">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-[1500px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <section className="relative hidden w-[48%] overflow-hidden bg-[#2f3a4f] lg:block">
          <Image
            src={signInSide}
            alt="Sign in side"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />

          <div className="absolute inset-0 bg-[#2C3545]/70" />

          <BrandLogo width={140} className="absolute left-8 top-8 z-10" />
        </section>

        <section className="flex w-full items-center justify-center bg-[#fcfcfd] px-6 py-10 sm:px-10 lg:w-[52%] lg:px-16">
          <div className="w-full max-w-[560px]">
            <div className="mb-10 lg:hidden">
              <BrandLogo width={140} />
            </div>

            <div className="space-y-2">
              <h1 className="text-[44px] font-semibold leading-[1.05] text-[#273142] sm:text-[52px]">
                Welcome
              </h1>
              <p className="text-sm text-[#97A0AF] sm:text-base">
                Please log in to your account to continue.
              </p>
            </div>

            <form className="mt-12">
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-sm font-medium text-[#3A4352]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Type your email address"
                  className="h-14 w-full rounded-xl border border-[#E7EAF0] bg-white px-4 text-sm text-[#273142] outline-none transition focus:border-[#f35b32] focus:ring-2 focus:ring-[#f35b32]/10"
                />
              </div>

              <div className="mt-3 text-right">
                <button
                  type="button"
                  className="text-xs font-medium text-[#F35B32] transition hover:opacity-80"
                >
                  Forget your email address?
                </button>
              </div>

              <button
                type="submit"
                className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-[#F35B32] px-6 text-sm font-semibold text-white transition hover:bg-[#df4f29]"
              >
                Continue
              </button>

              <div className="my-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#ECEFF4]" />
                <span className="text-xs text-[#A3ACB9]">or continue with</span>
                <div className="h-px flex-1 bg-[#ECEFF4]" />
              </div>

              <button
                type="button"
                className="mx-auto flex h-12 items-center justify-center gap-2 rounded-xl border border-[#ECEFF4] bg-[#F7F8FA] px-5 text-sm font-medium text-[#70798A] transition hover:bg-[#eef1f5]"
              >
                <Image
                  src={microsoftIcon}
                  alt="Microsoft"
                  width={14}
                  height={14}
                  className="h-[14px] w-[14px]"
                />
                Work or school account
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}