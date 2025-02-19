import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReviewJobVacancyProvider() {
  return (
    <section>
      <span>Deskripsi</span>
      <span>Pekerjaan</span>
      <p>Tentang Perusahaan</p>
      <p>Hubungi Kami</p>
      <p>Alamat</p>
      <p>Media Sosial</p>
      <form>
        <div className="flex justify-center items-center w-fit space-x-1"></div>
        <div className="flex justify-center items-center w-full space-x-4">
          <Input placeholder="Tulis Ulasan" />
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <div className="flex w-full flex-col justify-start items-start"></div>
    </section>
  );
}
