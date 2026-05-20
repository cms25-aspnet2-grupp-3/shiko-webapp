import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import SubmitButton from "@/components/auth/SubmitButton";
import { providerMap, signIn } from "@/auth";

const SIGNIN_ERROR_URL = "/signin";
const DASHBOARD_URL = "/dashboard";

function getSignInErrorMessage(error?: string) {
  if (!error) return null;
  if (error === "CredentialsSignin") return "Invalid email or password.";
  if (error === "RefreshTokenError")
    return "Session expired. Please sign in again.";
  return "Sign in failed. Please try again.";
}

async function handleSignInAction(action: () => Promise<void>) {
  "use server";

  try {
    await action();
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
}

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams?.callbackUrl ?? DASHBOARD_URL;
  const errorMessage = getSignInErrorMessage(searchParams?.error);

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600px] md:grid-cols-2">
      <div className="hidden bg-white p-4 md:block md:p-6">
        <div
          className="h-full w-full rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: "url('/images/auth.png')" }}
        />
      </div>

      <div className="flex items-center justify-center bg-white p-8 md:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Enter Password</h1>
            <p className="text-sm text-gray-500">
              Please enter your password to log in to your account.
            </p>
          </div>

          {errorMessage && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <form
            className="space-y-4"
            action={async (formData) => {
              "use server";
              return handleSignInAction(async () => {
                await signIn("credentials", {
                  ...Object.fromEntries(formData),
                  redirectTo: DASHBOARD_URL,
                });
              });
            }}
          >
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#ED5735]"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#ED5735]"
              />
            </div>

            <SubmitButton
              pendingLabel="Signing in..."
              className="w-full rounded-lg bg-[#ED5735] py-2.5 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed"
            >
              Sign In
            </SubmitButton>
          </form>

          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                return handleSignInAction(async () => {
                  await signIn(provider.id, {
                    redirectTo: callbackUrl,
                  });
                });
              }}
            >
              <SubmitButton
                pendingLabel={`Signing in with ${provider.name}...`}
                className="w-full rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed"
              >
                Sign in with {provider.name}
              </SubmitButton>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
