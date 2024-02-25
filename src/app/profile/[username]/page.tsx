import Profile from "@/components/profile/profile";
import { profile } from "console";

const getProfile = async (username: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/profile?username=${username}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return { message: "Error fetching profile" };
  }
};

export default async function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const profile = await getProfile(username);

  return <Profile profileFormData={profile} />;
}
