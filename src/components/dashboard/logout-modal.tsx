import { Button } from "../ui/button";

export function LogoutModal() {
  return (
    <div>
      <h3 className="text-black font-bold text-xl">Logout?</h3>
      <div>
        <Button className="bg-secondary_color_1 hover:bg-primary_color">
          Iya
        </Button>
        <Button variant="outline">Tidak</Button>
      </div>
    </div>
  );
}
