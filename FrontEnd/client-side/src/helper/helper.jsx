export function getProfileRoute(user) {
  if (!user) return "/login";

  if (user.role === "company") return `/company/${user._id}`;
  if (user.role === "condidate") return `/condidates/${user._id}`;

  return "/";
}

export function getDashboardRoute(user) {
  if (!user) return "/login";

  if (user.role === "company") return "/DashboardCompanie";
  if (user.role === "condidate") return "/condidateDashboard";

  return "/";
}