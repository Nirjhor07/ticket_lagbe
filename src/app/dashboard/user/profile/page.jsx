import ProfileView from "@/components/ProfileView";
import { getUserSession } from "@/lib/core/getUserSession";

const UserProfilePage = async () => {
  // Fetch user session/DB info (using your actual DB fetcher or getUserSession)
  const session = await getUserSession();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 p-6 md:p-10 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Account Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
          Manage your personal details and platform credentials.
        </p>
      </div>

      <ProfileView user={session} />
    </main>
  );
};

export default UserProfilePage;
