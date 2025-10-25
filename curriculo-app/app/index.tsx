import { Box } from "@/components/ui/box";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SideMenu from "@/components/SideMenu";

export default function App() {
  return (
    <SideMenu>
      <Box className="flex-1 justify-center items-center bg-background-0">
        <ThemeSwitcher />
      </Box>
    </SideMenu>
  );
}