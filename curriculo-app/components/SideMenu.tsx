import React, { useRef, useState } from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

type DrawerLayoutProps = {
  children: React.ReactNode;
};

const DrawerLayout: React.FC<DrawerLayoutProps> = ({ children }) => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>('left');

  const changeDrawerPosition = () => {
    setDrawerPosition(drawerPosition === 'left' ? 'right' : 'left');
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button title="Close drawer" onPress={() => drawer.current?.closeDrawer()} />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        {/* Cabeçalho fixo do Drawer */}
        <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>

        <Button title="Change Drawer Position" onPress={changeDrawerPosition} />

        <Button title="Open drawer" onPress={() => drawer.current?.openDrawer()} />

        {/* Conteúdo da página */}
        <View style={styles.content}>{children}</View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerLayout;