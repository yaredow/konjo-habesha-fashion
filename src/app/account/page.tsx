import { auth } from "@/auth";
import { formatName } from "@/utils/formatName";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  return (
    <main className="mx-8 my-8 md:mx-20 md:my-12">
      <div className="flex flex-row gap-16">
        <div className="flex w-4/5 flex-col">
          <div className="mb-4 text-lg font-semibold">{`Hello ${formatName(user?.name as string)}`}</div>
          <p>
            From your account dashboard you can view your recent orders, manage
            your shipping and billing addresses, and edit your password and
            account details.
          </p>
        </div>
      </div>
    </main>
  );
}
