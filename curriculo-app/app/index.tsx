import { Box } from '@/components/ui/box';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function App() {
  return (
    <Box className="flex-1 justify-center items-center bg-background-0">
      <ThemeSwitcher />
    </Box>
  );
}