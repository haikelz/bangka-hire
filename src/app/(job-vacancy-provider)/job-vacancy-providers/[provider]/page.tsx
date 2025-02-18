import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JobVacancyProvider() {
  return (
    <section>
      Deskripsi Pekerjaan
      <div className="flex justify-center items-center w-full space-x-4">
        <Input placeholder="Tulis Ulasan" />
        <Button type="submit">Submit</Button>
      </div>
      <div></div>
    </section>
  );
}
