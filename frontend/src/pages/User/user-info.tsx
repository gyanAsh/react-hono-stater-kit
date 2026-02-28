import { $token } from "@/store/user";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

const UserInfo = () => {
  const token = useStore($token);

  // Queries
  const query = useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const response = await fetch("/backend/api/user/get-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include bearer token here
        },
      });

      // 1. Check for HTTP errors (fetch doesn't throw on 404/500)
      if (!response.ok) {
        // Throwing here lets React Query know the fetch failed
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 2. Return the data directly
      return response.json();
    },
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <div>
      User Logged-In
      <br />
      <br />
      {JSON.stringify(query.data)}
    </div>
  );
};

export default UserInfo;
