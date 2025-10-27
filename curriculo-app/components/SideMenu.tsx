import React from 'react';
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { Divider } from '@/components/ui/divider';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { User, Home, ShoppingCart, Wallet, LogOut, Menu } from 'lucide-react-native';

type SideMenuProps = {
  children?: React.ReactNode;
};

export default function SideMenu({ children }: SideMenuProps) {
  const [showDrawer, setShowDrawer] = React.useState(false);

  // toggle simples (abre se fechado e fecha se aberto)
  const toggleDrawer = () => {
    setShowDrawer(prev => !prev);
  };

  return (
    <>
      {/* Barra superior com o ícone de sanduíche no canto esquerdo */}
      <Pressable
        onPress={toggleDrawer}
        className="absolute top-4 left-4 z-50 p-2 rounded-md"
        accessibilityLabel="Open menu"
        hitSlop={8} // aumenta área de toque (pode depender do componente Pressable)
      >
        <Icon as={Menu} size="xl" className="text-typography-700" />
      </Pressable>

      {/* Drawer */}
      <Drawer isOpen={showDrawer} onClose={() => setShowDrawer(false)}>
        <DrawerBackdrop />
        <DrawerContent className="w-[270px] md:w-[300px]">
          <DrawerHeader className="justify-center flex-col gap-2">
            <Avatar size="2xl">
              <AvatarFallbackText>User Image</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=687&q=80',
                }}
              />
            </Avatar>
            <VStack className="justify-center items-center">
              <Text size="lg">User Name</Text>
              <Text size="sm" className="text-typography-600">
                abc@gmail.com
              </Text>
            </VStack>
          </DrawerHeader>

          <Divider className="my-4" />

          <DrawerBody contentContainerClassName="gap-2">
            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
              <Icon as={User} size="lg" className="text-typography-600" />
              <Text>My Profile</Text>
            </Pressable>

            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
              <Icon as={Home} size="lg" className="text-typography-600" />
              <Text>Saved Address</Text>
            </Pressable>

            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
              <Icon as={ShoppingCart} size="lg" className="text-typography-600" />
              <Text>Orders</Text>
            </Pressable>

            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
              <Icon as={Wallet} size="lg" className="text-typography-600" />
              <Text>Saved Cards</Text>
            </Pressable>
          </DrawerBody>

          <DrawerFooter>
            <Button className="w-full gap-2" variant="outline" action="secondary" onPress={() => setShowDrawer(false)}>
              <ButtonText>Logout</ButtonText>
              <ButtonIcon as={LogOut} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      {children}
    </>
  );
}