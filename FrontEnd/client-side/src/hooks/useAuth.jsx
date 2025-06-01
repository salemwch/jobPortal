import { useMemo } from "react";

const useAuth = () => {
  const authData = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return {
        user: parsed.user || null,
        token: parsed.refreshToken || null,
      };
    } catch (err) {
      console.error("Failed to parse user session:", err);
      return { user: null, token: null };
    }
  }, []);

  return authData;
};

export default useAuth;
