export const formatTotalDuration = (totalDurationMinutes: number): string => {
  if (totalDurationMinutes > 60) {
    const hours = Math.floor(totalDurationMinutes / 60);
    const minutes = totalDurationMinutes % 60;
    const hoursPart = `${hours} hr${hours === 1 ? "" : "s"}`;

    if (minutes === 0) {
      return hoursPart;
    }

    return `${hoursPart} ${minutes} min`;
  }

  return `${totalDurationMinutes} min`;
};
