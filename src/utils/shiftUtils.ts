export const calculateDuration = (startTime: Date, endTime: Date): { hours: number; minutes: number } => {
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    const diffMs = end.getTime() - start.getTime();
    if (diffMs < 0) {
      throw new Error("End time cannot be before start time");
    }
  
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return { hours, minutes };
  };
  