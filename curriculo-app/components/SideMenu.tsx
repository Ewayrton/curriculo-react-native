import React, { useRef } from 'react';
import {
  DrawerLayoutAndroid,
  View,
  Pressable,
} from 'react-native';
import ThemeSwitcher from './ThemeSwitcher';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Menu } from 'lucide-react-native';

type DrawerLayoutProps = {
  children: React.ReactNode;
};

const SideMenu: React.FC<DrawerLayoutProps> = ({ children }) => {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  const navigationView = () => (
    <View className="flex-1 p-4 items-center bg-gray-100 dark:bg-gray-800"
    >
      <ThemeSwitcher className="absolute top-2 left-5" />

      <Button
        className="absolute bottom-5 w-2/4 bg-sky-400"
        onPress={() => drawer.current?.closeDrawer()}
      >
        <ButtonText>Fechar menu</ButtonText>
      </Button>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}
    >
      <View
        // Define a cor de fundo principal com base no tema
        className="flex-1 p-4 bg-white dark:bg-gray-900"
      >
        {/* Botão para abrir o menu */}
        <Pressable
          onPress={() => drawer.current?.openDrawer()}
          className="absolute top-2.5 left-2.5 p-2.5 z-10"
        >
          <Icon 
            as={Menu} 
            className="text-2xl text-black dark:text-white "
          />
        </Pressable>
        <View className="flex-1 justify-center items-center">{children}</View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default SideMenu;