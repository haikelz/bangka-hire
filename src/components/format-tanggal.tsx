import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale"; // Sesuaikan locale dengan bahasa yang diinginkan

export function formatTanggal(createdAt: Date) {
  const date = new Date(createdAt);
  const now = new Date();

  // Hitung selisih waktu dalam hari
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  // Jika kurang dari 7 hari, tampilkan waktu relatif
  if (diffInDays < 7) {
    return formatDistanceToNow(date, { addSuffix: true, locale: id });
  }

  // Jika lebih dari 7 hari, tampilkan format tanggal
  return format(date, "dd, MMM yyyy", { locale: id });
}
